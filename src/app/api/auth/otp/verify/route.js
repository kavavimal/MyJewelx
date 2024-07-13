import prisma from "@/lib/prisma";
// import { generatePass } from "@/utils/helper";
import { hash } from "bcrypt";

import { NextResponse } from "next/server";
import * as z from "zod";

function generatePass() {
  let pass = "";
  let str =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

  for (let i = 1; i <= 8; i++) {
    let char = Math.floor(Math.random() * str.length + 1);

    pass += str.charAt(char);
  }

  return pass;
}

const userSchema = z.object({
  email: z.string().optional(),
  phone_number: z.string().optional(),
  otp: z.string().min(1, "Otp is Required"),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, phone_number, otp } = userSchema.parse(body);
    if (email && email !== null) {
      const exists = await prisma.otpVerification.findUnique({
        where: {
          email,
        },
      });
      if (!exists) {
        return NextResponse.json(
          { error: "Something went wrong, Resend Otp." },
          { status: 500 }
        );
      } else {
        const isExpired = Date.now() > exists.expiry;
        if (isExpired) {
          return NextResponse.json(
            { error: "OTP Expired, Try resending it" },
            { status: 401 }
          );
        }
        if (otp === exists.otp) {
          if (exists.mode === "registration") {
            const deletedOTP = await prisma.otpVerification.delete({
              where: { email: email },
            });
            return NextResponse.json(
              { success: "OTP verification success" },
              { status: 201 }
            );
          } else if (exists.mode === "forgotPassword") {
            const deletedOTP = await prisma.otpVerification.delete({
              where: { email: email },
            });
            const newPassword = generatePass();
            const updateUser = await prisma.user.update({
              where: {
                email: email,
              },
              data: {
                password: await hash(newPassword, 10),
              },
            });
            return NextResponse.json(
              {
                data: { password: newPassword },
                message: "Password Updated",
              },
              { status: 201 }
            );
          }
        } else {
          return NextResponse.json({ error: "Invalid Otp!" }, { status: 400 });
        }
      }
    } else if (phone_number && phone_number !== null) {
      const exists = await prisma.user.findUnique({
        where: {
          phone_number,
        },
      });
      if (!exists) {
        return NextResponse.json(
          {
            error: "Phone Number you provided is not registered with my-jewlex",
          },
          { status: 400 }
        );
      } else {
        return NextResponse.json(
          {
            message:
              "Jwelex working on messaging capabilities, try using Email for now",
          },
          { status: 201 }
        );
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went Wrong!" },
      { status: 500 }
    );
  }
}
