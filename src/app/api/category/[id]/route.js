import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const category_id = Number(params.id);
  const res = await request.formData();

  try {
    const result = await prisma.category.update({
      where: {
        category_id: category_id,
      },
      data: {
        name: res.get("name"),
        description: res.get("description"),
      },
    });
    return NextResponse.json({ result });
  } catch (error) {}
};

export const DELETE = async (request, { params }) => {
  try {
    const category_id = Number(params.id);
    const result = await prisma.category.delete({
      where: {
        category_id: category_id,
      },
    });
    return NextResponse.json({ result });
  } catch (error) {}
};
