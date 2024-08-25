import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req = await request.formData();
  const likedId = req.get("likedId");
  const likerId = req.get("likerId");
  const exist = await prisma.storeLikes.findFirst({
    where: {
      likedId: likedId,
      likerId: likerId,
    },
    include: {
      liked: true,
      liker: true,
    },
  });

  if (exist) {
    return NextResponse.json(
      {
        liked: true,
        response: exist,
        message: "Already liked",
      },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      {
        liked: false,
        response: exist,
      },
      {
        status: 200,
      }
    );
  }
}
