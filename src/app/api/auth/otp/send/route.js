import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import * as z from "zod";
import emailOtpSend from "../components/emailOtpSend";

const userSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email field has to be filled." })
    .email("This is not a valid email."),
  phone_number: z.string().optional(),
  mode: z.string().min(1, { message: "Mode is required" }),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, phone_number, mode } = userSchema.parse(body);
    const expiryTime = new Date();
    const expiry = expiryTime.setSeconds(expiryTime.getSeconds() + 600);
    if (mode === "registration") {
      if (email !== null) {
        const exists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (exists) {
          return NextResponse.json(
            { error: "User already exists" },
            { status: 400 }
          );
        } else {
          await emailOtpSend(email, mode, expiry);
          return NextResponse.json(
            { message: "Otp Sent successfully" },
            { status: 201 }
          );
        }
      } else if (phone_number && phone_number !== null) {
        return NextResponse.json(
          {
            message:
              "Jwelex working on messaging capabilities, try using Email for now",
          },
          { status: 201 }
        );
      }
    } else if (mode === "forgotPassword") {
      if (email !== null) {
        const exists = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!exists) {
          return NextResponse.json(
            { error: "Email you provided is not registered with my-jewlex" },
            { status: 400 }
          );
        } else {
          await emailOtpSend(email, mode, expiry);
          return NextResponse.json(
            { message: "Otp Sent successfully" },
            { status: 201 }
          );
        }
      } else if (phone_number !== null) {
        const exists = await prisma.user.findUnique({
          where: {
            phone_number,
          },
        });
        if (!exists) {
          return NextResponse.json(
            {
              error:
                "Phone Number you provided is not registered with my-jewlex",
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
    }
  } catch (error) {
    console.log(error);
    if (error.name === "ZodError") {
      return Response.json(
        { error: error.name, issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Something went Wrong!" },
      { status: 500 }
    );
  }
}
