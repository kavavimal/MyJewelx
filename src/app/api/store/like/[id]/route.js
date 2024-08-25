import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { id } = params;
  const req = await request.formData();
  const likerId = req.get("likerId");

  const exist = await prisma.storeLikes.findFirst({
    where: {
      likedId: id,
      likerId: likerId,
    },
    include: {
      liked: true,
      liker: true,
    },
  });

  if (exist) {
    const response = await prisma.storeLikes.delete({
      where: {
        id: exist.id,
      },
      include: {
        liked: true,
        liker: true,
      },
    });

    return NextResponse.json(
      { response: response, message: "Unliked" },
      { status: 200 }
    );
  } else {
    const response = await prisma.storeLikes.create({
      data: {
        likedId: id,
        likerId: likerId,
      },
    });

    return NextResponse.json({ response, message: "Liked" }, { status: 201 });
  }
}
