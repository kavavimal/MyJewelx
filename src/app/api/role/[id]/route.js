import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request, { params }) {
  try {
    const role_id = Number(params.id);

    const exists = await prisma.role.findFirst({
      where: { role_id },
      include: { users: true },
    });

    if (!exists) {
      return NextResponse.json(
        { error: `Can't find the role with role_id ${role_id}` },
        { status: 400 }
      );
    } else if (exists.users.length > 0) {
      return NextResponse.json(
        { error: `Can't update Role that is associated with User` },
        { status: 400 }
      );
    }

    const req = await request.formData();
    let updateData = {};
    if (typeof req.get("name") === "string" && req.get("name") !== "") {
      updateData.role_name = req.get("name");
    }

    const existsWithName = await prisma.role.findFirst({
      where: { role_name: role_name },
    });

    if (existsWithName) {
      return NextResponse.json(
        {
          error: `This role with role_name ${updateData.role_name} already exists`,
        },
        { status: 400 }
      );
    }

    if (
      typeof req.get("description") === "string" &&
      req.get("description") !== ""
    ) {
      updateData.description = req.get("description");
    }

    if (
      typeof req.get("permissions") === "string" &&
      req.get("permissions") !== ""
    ) {
      const permissions = req.get("permissions");
      const permissionArray = permissions.split(",");
      updateData.permissions = {
        create: [
          ...permissionArray.map((permissionId) => ({
            permission: { connect: { permission_id: parseInt(permissionId) } },
          })),
        ],
      };
    }

    await prisma.rolePermission.deleteMany({
      where: {
        role_id: role_id,
      },
    });

    const result = await prisma.role.update({
      where: {
        role_id: role_id,
      },
      data: { ...updateData },
    });

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in PUT:", error);
    return NextResponse.json(
      { error: "Internal Server Error", e: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const role_id = Number(params.id);

    //check if there are users associated with the role

    const role = await prisma.role.findUnique({
      where: { role_id: role_id },
      include: { users: true },
    });

    if (!role) {
      return NextResponse.json(
        { error: `Can't find the role with role_id ${role_id}` },
        { status: 400 }
      );
    } else if (role.users.length > 0) {
      return NextResponse.json(
        { error: `Can't update Role that is associated with User` },
        { status: 400 }
      );
    }

    await prisma.rolePermission.deleteMany({
      where: { role_id: role_id },
    });

    const deletedRole = await prisma.role.delete({
      where: { role_id: role_id },
    });

    return NextResponse.json(deletedRole);
  } catch (error) {
    console.error("Error in DELETE:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
