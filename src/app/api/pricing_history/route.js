import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const pricingHistoryUpdateSchema = z.object({
  karat24: z
    .number({ message: "karat24 must be a number" })
    .nonnegative({ message: "karat24 is required" }),
  karat22: z
    .number({ message: "karat22 must be a number" })
    .nonnegative({ message: "karat22 is required" }),
  karat21: z
    .number({ message: "karat21 must be a number" })
    .nonnegative({ message: "karat21 is required" }),
  karat18: z
    .number({ message: "karat18 must be a number" })
    .nonnegative({ message: "karat18 is required" }),
  karat14: z
    .number({ message: "karat14 must be a number" })
    .nonnegative({ message: "karat14 is required" }),
  karat09: z
    .number({ message: "karat09 must be a number" })
    .nonnegative({ message: "karat09 is required" }),
  silver: z
    .number({ message: "silver must be a number" })
    .nonnegative({ message: "silver is required" }),
  platinum: z
    .number({ message: "platinum must be a number" })
    .nonnegative({ message: "platinum is required" }),
  palladium: z
    .number({ message: "palladium must be a number" })
    .nonnegative({ message: "palladium is required" }),
});

const pricingHistoryCreateSchema = pricingHistoryUpdateSchema.extend({
  date: z.string({ message: "date is required and must be a string" }),
});

export async function POST(request) {
  try {
    const req = await request.formData();

    // const date = parseFloat(req.get("date"));
    const isoString = new Date().toISOString();
    const date = isoString.substring(0, 10);

    const pricingHistory = await prisma.pricingHistory.findFirst({
      where: { date: date },
    });

    const inputData = {
      karat24: parseFloat(req.get("karat24")),
      karat22: parseFloat(req.get("karat22")),
      karat21: parseFloat(req.get("karat21")),
      karat18: parseFloat(req.get("karat18")),
      karat14: parseFloat(req.get("karat14")),
      karat09: parseFloat(req.get("karat09")),
      silver: parseFloat(req.get("silver")),
      platinum: parseFloat(req.get("platinum")),
      palladium: parseFloat(req.get("palladium")),
    };

    console.log("inputData", inputData);

    if (pricingHistory) {
      console.log("form update");
      // Validate the input data using Zod
      const validatedData = pricingHistoryUpdateSchema.parse(inputData);

      const updatedPricingHistory = await prisma.pricingHistory.update({
        where: { date: date },
        data: validatedData,
      });

      return NextResponse.json(
        {
          message: `Pricing history updated successfully`,
          updatedPricingHistory,
        },
        { status: 200 }
      );
    } else {
      // Validate the input data using Zod
      console.log("form create");
      const validatedData = pricingHistoryCreateSchema.parse({
        date,
        ...inputData,
      });

      const newPricingHistory = await prisma.pricingHistory.create({
        data: validatedData,
      });

      return NextResponse.json(
        {
          message: `Pricing is created for the date ${date}`,
          newPricingHistory,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log("error", error);
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
