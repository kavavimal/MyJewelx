import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const stateSchema = z.object({
  name: z.string().min(1, "state name required").max(50),
  country_id: z.number(),
});

export async function POST(request) {
  try {
    const res = await request.formData();
    const name = res.get("name");
    const country_id = Number(res.get("country_id"));

    const stateData = stateSchema.parse({ name, country_id });

    const newState = await prisma.state.create({
      data: stateData,
    });

    return NextResponse.json(
      { message: "New State added successfully", newState },
      { status: 201 }
    );
  } catch (error) {
    if (error === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
