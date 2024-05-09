import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request, {params}) {
  try {
    const res = await request.formData();
    let updateData = {};
    if (typeof res.get("name") === "string" && res.get("name") !== "") {
      updateData.role_name = res.get("name");
    }
    if (
      typeof res.get("description") === "string" &&
      res.get("description") !== ""
      ) {
        updateData.description = res.get("description");
      }

    if (
      typeof res.get("permissions") === "string" &&
      res.get("permissions") !== ""
    ) {
      const permissions = res.get("permissions");
      const permissionArray = permissions.split(",");
      updateData.permissions= {
        create: [
          ...permissionArray.map(permissionId => ({ permission: {connect: {permission_id: parseInt(permissionId)}}})),
        ],
      }
    }

    await prisma.rolePermission.deleteMany({
      where: {
        role_id: Number(params.id),
      },
    });

    const result = await prisma.role.update({
      where: {
        role_id: Number(params.id),
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
    const roleId = Number(params.id);

    //check if there are users associated with the role

    const userWithRole = await prisma.user.findMany({
        where : { role_id: roleId}
    });

    if(userWithRole.length > 0 ) {
        return NextResponse.json(
            {error: "Can't delete Role with associated User"},
            {status: 400}
        )
    }
    
    await prisma.rolePermission.deleteMany({
      where: { role_id: roleId },
    });

    const deletedRole = await prisma.role.delete({
      where: { role_id: roleId },
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
