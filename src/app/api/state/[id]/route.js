import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const stateSchema = z.object({
  name: z.string().min(1, "state name required").max(50),
  country_id: z.number(),
});

export async function PUT(request, { params }) {
  try {
    const state_id = Number(params.id);

    const state = await prisma.state.findUnique({
      where: { state_id },
      include: { products: true },
    });
    if (!state) {
      return NextResponse.json(
        {
          error: `Couldn't find State with state_id ${state_id}`,
        },
        { status: 400 }
      );
    } else if (state.products.length > 0) {
      return NextResponse.json(
        { error: "State is in use and can't be deleted" },
        { status: 405 }
      );
    }
    const req = await request.formData();
    const name = req.get("name");

    const stateWithName = await prisma.state.findFirst({ where: { name: name } });

    if (stateWithName) {
      return NextResponse.json({
        error: `This state/city name ${name} is already taken`,
      });
    }

    const country_id = Number(req.get("country_id"));

    const stateData = stateSchema.parse({ name, country_id });

    const result = await prisma.state.update({
      where: { state_id },
      data: stateData,
    });

    return NextResponse.json(
      { message: "State updated successfully", result },
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

export async function DELETE(request, { params }) {
  try {
    const state_id = Number(params.id);

    const state = await prisma.state.findUnique({
      where: { state_id },
      include: { products: true },
    });
    if (!state) {
      return NextResponse.json(
        {
          error: `Couldn't find State with state_id ${state_id}`,
        },
        { status: 400 }
      );
    } else if (state.products.length > 0) {
      return NextResponse.json(
        { error: "State is in use and can't be deleted" },
        { status: 405 }
      );
    }

    const result = await prisma.state.delete({
      where: { state_id },
    });
    return NextResponse.json(
      {
        message: "State removed successfully",
        state,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
