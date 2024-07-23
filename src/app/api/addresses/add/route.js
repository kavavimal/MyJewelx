import { fetchCurrentUser } from "@/actions/users";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateAttributeValueSchema = z.object({
  name: z.string().min(1, "Attribute value name required").max(50),
  attribute_id: z.number(),
});

export async function POST(request, { params }) {
    const user = await fetchCurrentUser();
    console.log('user session', user)
  try {
    const res = await request.formData();
    const type = res.get('type');
    const firstName = res.get('firstName'); 
    const lastName = res.get('lastName'); 
    const street = res.get('street'); 
    const city = res.get('city'); 
    const state = res.get('state'); 
    const zipCode = res.get('zipCode'); 
    const country = res.get('country'); 
    const phone = res.get('phone'); 
    const email = res.get('email');

    const address = await prisma.address.create({
        data: {
          userId: user.id,
          type,
          firstName,
          lastName,
          street,
          city,
          state,
          zipCode,
          country,
          phone,
          email,
        },
      });
    return NextResponse.json(
      { message: "Address Saved Successfully", address },
      { status: 201 }
    );
  } catch (error) {
    console.log('error', error);
    if (error === "ZodError") {
      return NextResponse.json(
        { error: "Validation Error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error", e: error },
      { status: 500 }
    );
  }
}
