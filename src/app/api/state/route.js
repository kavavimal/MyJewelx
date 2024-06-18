import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const stateSchema = z.object({
  name: z.string().min(1, "state name required").max(50),
  country_id: z.number(),
});

export async function POST(request) {
  try {
    const req = await request.formData();
    const name = req.get("name");

    const state = await prisma.state.findFirst({ where: { name: name } });

    if (state) {
      return NextResponse.json({
        error: `This state/city name ${name} is already taken`,
      });
    }

    const country_id = Number(req.get("country_id"));

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
