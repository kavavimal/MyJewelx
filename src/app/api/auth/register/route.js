import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";
import { AcountType } from "@prisma/client";
import { mailOptions, transporter } from "@/config/nodemailer";

//Define schema for input validation
const userSchema = z.object({
  firstName: z.string().min(1, "FirstName is required").max(100),
  lastName: z.string().min(1, "LastName is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is Required")
    .max(8, "Password must have 8 characters"),
  confirmPassword: z
    .string()
    .min(1, "confirmPassword is Required")
    .max(8, "confirmPassword must have 8 characters").refine(data => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }),
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = userSchema.parse(body);
    const companyEmail = process.env.Email;
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
      const newUser = await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: await hash(password, 10),
          // first_name: "admin",
          // last_name: "",
          phone_number: body.phone_number ?? "",
          account_type: AcountType.CUSTOMER,
          role: {
            connectOrCreate: {
              where: {
                role_name: AcountType.CUSTOMER,
              },
              create: {
                role_name: AcountType.CUSTOMER,
              },
            },
          },
        },
      });

      const generateWelcomeEmailContent = (
        firstName,
        lastName,
        companyEmail,
        companyName = null
      ) => {
        const htmlData = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Welcome to Our Platform!</title>
                <style>
                    /* Your CSS styles here */
                </style>
            </head>
            <body>
                <div class="container">
                    <h2 class="heading">Welcome to Our Platform!</h2>
                    <p class="text">Dear ${firstName + " " + lastName},</p>
                    <p class="text">Thank you for registering with us. We are excited to have you on board!</p>
                    <p class="text">Here are a few things you can do:</p>
                    <ul class="list">
                        <li>Customize your profile and settings.</li>
                        <li>Discover a wide range of products from top brands.</li>
                        <li>Add items to your cart and checkout securely.</li>
                        <li>Track your orders and stay updated on delivery status.</li>
                        <li>Explore exclusive deals and discounts tailored just for you.</li>
                    </ul>
                    <p class="text">If you have any questions or need assistance, feel free to contact us at <strong>${companyEmail}</strong>.</p>
                    <p class="text">Enjoy your experience!</p>
                    <p class="footer">Best regards,<br>${
                      companyName ? companyName : "My-jewlex"
                    } Team</p>
                </div>
            </body>
            </html>
        `;

        return {
          html: htmlData,
        };
      };

      const { password: newUserPassword, ...rest } = newUser;
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        ...generateWelcomeEmailContent(firstName, lastName, companyEmail),
        subject: "My-jewlex Registration",
      });

      return NextResponse.json(
        { user: rest, message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went Wrong!" },
      { status: 500 }
    );
  }
}
