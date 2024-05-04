import prisma from "@/lib/prisma";
// import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from 'zod';
import { AcountType } from "@prisma/client";

//Define schema for input validation
const userSchema = z
.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email('Invalid email'),
  password: z.string().min(1, "Password is Required").max(8, 'Password must have 8 characters')
})

export async function POST(req ) {
  try{
    const body = await req.json();
    const { email, username, password } = userSchema.parse(body);
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    } else {
      const newUser = await prisma.user.create({
        data: {
          email,
          username,
          password: await hash(password, 10),
          // first_name: "admin",
          // last_name: "",
          // phone_number: "",
          account_type: AcountType.CUSTOMER,
          role: {
            connectOrCreate: {
              where: {
                role_name: "customer",
              },
              create: {
                role_name: "customer",
              }
            },
          },
        },
      });

      const { password: newUserPassword, ...rest } = newUser;

      return NextResponse.json({ user: rest, message: "User created successfully"}, {status: 201});
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went Wrong!"}, {status: 500});
  }
}
