import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const req = await request.formData();

    const name = req.get("name");

    const exists = await prisma.role.findFirst({
      where: { role_name: role_name },
    });

    if (exists) {
      return NextResponse.json(
        { error: `This role with role_name ${name} already exists` },
        { status: 400 }
      );
    }

    const description = req.get("description");
    const permissions = req.get("permissions");
    const permissionArray = permissions.split(",");

    const result = await prisma.role.create({
      data: {
        role_name: name ? String(name) : "",
        description: description ? String(description) : "",
        permissions: {
          create: [
            ...permissionArray.map((permissionId) => ({
              permission: {
                connect: { permission_id: parseInt(permissionId) },
              },
            })),
          ],
        },
      },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}
