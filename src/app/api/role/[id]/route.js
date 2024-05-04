// import { NextRequest, NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// export async function PUT(request, {params}) {
//   try {
//     const res = await request.formData();
//     let updateData = {};
//     if (typeof res.get("name") === "string" && res.get("name") !== "") {
//       updateData.role_name = res.get("name");
//     }
//     if (
//       typeof res.get("description") === "string" &&
//       res.get("description") !== ""
//       ) {
//         updateData.description = res.get("description");
//       }
//     const result = await prisma.role.update({
//       where: {
//         role_id: Number(params.id),
//       },
//       data: { ...updateData },
//     });

//     return NextResponse.json({ result });
//   } catch (error) {
//     console.error("Error in PUT:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error", e: error },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     const roleId = Number(params.id);

//     const deletedRole = await prisma.role.delete({
//       where: { role_id: roleId },
//     });

//     return NextResponse.json(deletedRole);
//   } catch (error) {
//     console.error("Error in DELETE:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
