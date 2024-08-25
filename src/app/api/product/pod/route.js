import prisma from "@/lib/prisma";
import { NextResponse, userAgent } from "next/server";
import { z } from "zod";
import { join } from "path";
import { writeFile } from "fs/promises";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { AcountType, PODStatus } from "@prisma/client";
import { JODMail } from "@/lib/sendMails";

const productPODSchema = z.object({
  name: z.string().min(1, "Product name required").max(50),
  description: z.string().optional(),
  contact: z.string(),
  metal_type: z.string(),
});

const checkUserSession = async () => {
  const session = await getServerSession(authOptions);

  if ([AcountType.VENDOR, AcountType.CUSTOMER].includes(session?.user?.role))
    return session.user;
  return false;
};

export async function POST(request) {
  try {
    const user = await checkUserSession();
    if (!user) {
      return NextResponse.json(
        { error: "You are not authorized to Create Product On Demand Request" },
        { status: 401 }
      );
    }

    const req = await request.formData();

    const product_name = req.get("name");
    const Status = req.get("status") ? req.get("status") : "DRAFT";
    const description = req.get("description");
    const weight_type = req.get("weight_type");
    const min_weight = req.get("min_weight") ? req.get("min_weight") : null;
    const max_weight = req.get("max_weight") ? req.get("max_weight") : null;
    const price_type = req.get("price_type");
    const min_price = req.get("min_price") ? req.get("min_price") : null;
    const max_price = req.get("max_price") ? req.get("max_price") : null;
    const made_in = req.get("made_in");
    const metal_type = req.get("metal");
    const karat = req.get("karat") ? req.get("karat") : null;
    const contact = req.get("contact");

    const productData = {
      name: product_name,
      Status,
      description,
      contact,
      weight_type,
      price_type,
      made_in,
      metal_type,
    };
    if (min_weight !== null) {
      productData.min_weight = min_weight;
    }
    if (max_weight !== null) {
      productData.max_weight = max_weight;
    }
    if (min_price !== null) {
      productData.min_price = parseFloat(min_price);
    }
    if (max_price !== null) {
      productData.max_price = parseFloat(max_price);
    }
    if (karat !== null) {
      productData.karat = karat;
    }
    const parseProductData = productPODSchema.parse(productData);

    const files = await req.getAll("files[]");
    let images = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}_${i}_${file.name}`;

        const path = join(
          process.cwd(),
          "/public/assets/podrequests",
          fileName
        );
        await writeFile(path, buffer);

        images.push({
          path: `/assets/podrequests/${fileName}`,
          image_type: "pod",
        });
      }
    } else
      return NextResponse.json(
        {
          error: "Product Request must have at least 1 Image",
        },
        { status: 400 }
      );

    if (images.length > 0) {
      productData.Images = {
        createMany: {
          data: images,
        },
      };
    }

    const result = await prisma.productOnDemand.create({
      data: {
        ...productData,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        Images: true,
        user: true,
      },
    });
    // TODO: send email to customer and admin about request is saved
    await JODMail(user);
    return NextResponse.json({
      message: "Product On Demand Request added successfully",
      status: 201,
      result,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        {
          error: "Validation Error",
          issues: error.errors,
        },
        { status: 400 }
      );
    }
    console.log("error from catch", error);
    return NextResponse.json(
      { error: "Internal server Error", e: error },
      { status: 500 }
    );
  }
}

export async function GET() {
  const products = await prisma.productOnDemand.findMany({
    include: {
      Images: true,
      user: {
        include: {
          vendor: true,
        },
      },
    },
    where: {
      status: PODStatus.REQUESTED,
    },
  });
  return NextResponse.json({ products, success: true }, { status: 200 });
}
