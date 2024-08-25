import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import * as z from "zod";
import { AcountType } from "@prisma/client";
import { mailOptions, transporter } from "@/config/nodemailer";
// import logo from "../../../../../public/logo.svg";

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
    .max(8, "confirmPassword must have 8 characters")
    .refine((data) => data.password === data.confirmPassword, {
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
                  .text{
                    color: #333;
                  }

                  .heading{
                    text-align: center;
                  }

                  body{
                    font-family: 'Emirates', sans-serif;
                  }
                </style>
            </head>
            <body style="background-color: #ff0000;">
                <div style="padding: 30px; font-family: 'Emirates', sans-serif; margin: 0 auto;">
                    <div style="background-color: #fff; border-radius: 20px; box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);">
                      <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px; background-color: #fffbf2 ; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                        <img src="https://myjewlex.com/my-jewlex-logo.png" height="auto" alt="Jewlex Logo" style="width: 200px;">
                        <img src="https://myjewlex.com/sub-logo.png" width="300px" alt="Jewlex Logo" style="width: 100px;">
                        <h1 style="font-size: 22px; margin-bottom: 10px; font-style: italic">Discover The Beauty</h1>
                      </div>
                      <div style="font-size: 18px; margin-bottom: 20px; padding: 0 40px ;">
                        <h2 style="margin: 45px 0; text-align: center; font-size: 20px" >Welcome to myJewlex - Account Successfully Activated!</h2>
                        <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold">Dear, ${
                          firstName + " " + lastName
                        },</p>
                        <p style="font-size: 17px; color: grey; margin-bottom: 20px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Congratulations! Your account with myJewlex has been successfully activated.
                    We are delighted to have you join our community of jewelry enthusiasts and esteemed sellers. At myJewlex, we are 
                    committed to providing you with the finest jewelry and a seamless shopping experience.</p>
                        <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold;">What's next?</p>
                        <p style="font-size: 17px; color: grey; margin:0 0 20px 0; line-height: 25px ; letter-spacing: 0.5px ; word-spacing: 1px ;">Start listing your stunning pieces, reach a wider audience, and grow your business with our comprehensive 
                    seller tools.</p>
                        <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold;">Why myJewlex?</p>
                        <p style="font-size: 16px; line-height:25px; color:grey;"><strong style="color:black">Curated Collections:</strong> Discover jewelry that speaks to your style and occasions.</p>
                        <p style="font-size: 16px; line-height:25px; color:grey;"><strong style="color:black">Trusted Platform:</strong> Secure transactions and reliable customer support.</p>
                        <p style="font-size: 16px; line-height:25px; color:grey; margin-bottom: 20px"><strong style="color:black">Exclusive Designs:</strong> Unique pieces that are crafted with love and precision.</p>
                    <p style="font-size: 16px; color: grey; margin:0 0 20px 0; line-height: 25px; letter-spacing: 0.5px ; word-spacing: 1px ;">Thank you for choosing myJewlex. We are excited to be part of your journey and look forward to bringing you the 
                    best in jewelry.</p>
                        <p style="font-size: 16px; margin-bottom: 20px; color: grey; line-height:25px; letter-spacing: 0.5px ; word-spacing: 1px ;">Warm Regards: 
                        <br>${
                          companyName
                            ? `<p style='font-size: 16px; margin-bottom: 50px; font-weight: bold;'>${companyName} Team</p>`
                            : "<p style='font-size: 16px; margin-bottom: 50px; font-weight: bold;'>The myJewlex Team</p>"
                        } 
                        </p>
                        
                      </div>
                      <div class="footer">
                        <div style="text-align: left; margin-top: 20px; background-color: #fffbf2; padding: 10px 40px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
                          <table style="width: 100%;">
                            <tr>
                              <td style="vertical-align: top;">
                                <p style="font-weight:bold; font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
                                <p style="font-size: 14px;">Feel free to reach out to us anytime: <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">support@myJewlex.com</a></p>
                              </td>
                              <td style="align-self:right; horizontal-align: right;">
                                <a href="https://www.facebook.com/" style="color: #3b5998; margin-right: 10px;"><img src="https://myjewlex.com/facebook.png" alt="facebook" style="height: 20px; width: 20px;" ></a>
                                <a href="https://www.linkedin.com/" style="color: #007bb5; margin-right: 10px;"><img src="https://myjewlex.com/linkedin.png" alt="linkedin" style="height: 20px; width: 20px;" ></a>
                                <a href="https://www.instagram.com/" style="color: #e1306c;"><img src="https://myjewlex.com/instagram.png" alt="instagram" style="height: 20px; width: 20px;" ></a>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                    </div>         
                  </div>
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
        // attachments: [
        //   {
        //     filename: "logo.png",
        //     path: "/k/github/my-jwelex/public/logo.png",
        //     cid: "unique@nodemailer.com", //same cid value as in the html img src
        //   },
        //   {
        //     filename: "email-header-logo.png",
        //     path: "/k/github/my-jwelex/public/assets/images/email-header-logo.png",
        //     cid: "uniquehead@nodemailer.com", //same cid value as in the html img src
        //   },
        //   {
        //     filename: "facebook.svg",
        //     path: "/k/github/my-jwelex/public/assets/images/facebook.svg",
        //     cid: "uniquefb@nodemailer.com", //same cid value as in the html img src
        //   },
        //   {
        //     filename: "linkedin.svg",
        //     path: "/k/github/my-jwelex/public/assets/images/linkedin.svg",
        //     cid: "uniqueln@nodemailer.com", //same cid value as in the html img src
        //   },
        //   {
        //     filename: "instagram.svg",
        //     path: "/k/github/my-jwelex/public/assets/images/instagram.svg",
        //     cid: "uniqueig@nodemailer.com", //same cid value as in the html img src
        //   },
        // ],
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
