// import { generateOTP } from "@/utils/helper";
import { mailOptions, transporter } from "@/config/nodemailer";
import prisma from "@/lib/prisma";
export function generateOTP() {
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += Math.floor(Math.random() * 10);
  }
  return OTP;
}

export default async function emailOtpSend(
  email,
  mode,
  expiry,
  otpResend = false
) {
  const otp = generateOTP();
  const generateEmailContent = (otp, mode, otpResend) => {
    let stringData;
    let htmlData;

    const fontImport = `<link href="https://fonts.googleapis.com/css2?family=Emirates&family=Sans-serif&display=swap" rel="stylesheet">`;

    if (mode === "registration") {
      stringData = `Your ${
        otpResend ? "new" : ""
      } OTP for Registering your Email into my-jwelex is: <h3 class="form-heading" align="left">${otp}</h3>`;
      htmlData = `
      <head>${fontImport}</head>
      <div style="background-color: #f8f8f8; padding: 30px; font-family: 'Emirates', sans-serif;">
        <div style="background-color: #fff; padding: 30px; border-radius: 5px;">
          <div style="text-align: center;">
            <img src="cid:unique@nodemailer.com"/>
            <img src="cid:unique@nodemailer.com" alt="Jewlex Logo" style="width: 100px;">
            <img src="cid:unique@nodemailer.com" alt="Jewlex Logo" style="width: 100px;">
            <h1 style="font-size: 24px; margin-bottom: 10px;">Discover The Beauty</h1>
          </div>
          <h2 style="font-size: 18px; margin-bottom: 20px;">Your OTP for myJewlex Account Registration</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">Dear, John Doe</p>
          <p style="font-size: 16px; margin-bottom: 20px;">Thank you for choosing myJewlex, where we bring you exquisite and personalized jewelry experiences. To complete your account registration, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 5 minutes.</p>
          <div>Your OTP: <span  style="background-color: #ffcc00; padding: 10px; border-radius: 5px; font-size: 16px; margin-bottom: 20px; text-align: center;">${otp}</span></div>
          <p style="font-size: 16px; margin-bottom: 20px;">Please enter this code on the registration page to verify your email address and activate your myJewlex account.</p>
          <p style="font-size: 16px; margin-bottom: 20px;">If you did not initiate this registration, please disregard this email.</p>
          <p style="font-size: 16px; margin-bottom: 20px;">Warm Regards:</p>
          <p style="font-size: 16px; margin-bottom: 20px;">The myJewlex Team</p>
          <div style="text-align: center; margin-top: 20px; background-color: #ffcc00;">
            <p style="font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
            <p style="font-size: 14px;">Feel free to reach out to us anytime: <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">support@myJewlex.com</a></p>
          </div>
          <div style="text-align: center; margin-top: 20px; ">
            <a href="https://www.facebook.com/" style="color: #3b5998; margin-right: 10px;"><i class="fab fa-facebook-f" style="font-size: 20px;"></i></a>
            <a href="https://www.linkedin.com/" style="color: #007bb5; margin-right: 10px;"><i class="fab fa-linkedin-in" style="font-size: 20px;"></i></a>
            <a href="https://www.instagram.com/" style="color: #e1306c;"><i class="fab fa-instagram" style="font-size: 20px;"></i></a>
          </div>
        </div>
      </div>
      `;
    } else if (mode === "forgotPassword") {
      stringData = `Your ${
        otpResend ? "new" : ""
      } One time Password for resetting your password is: <h3 class="form-heading" align="left">${otp}</h3>`;
      htmlData = `
      <head>${fontImport}</head>
      <div style="padding: 30px; font-family: 'Emirates', sans-serif;">
        <div style="background-color: #fff; border-radius: 20px; box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px; background-color: #fffbf2 ; border-top-left-radius: 20px; border-top-right-radius: 20px;">
            <img src="cid:unique@nodemailer.com" height="200px" alt="Jewlex Logo" style="width: 100px;">
            <img src="cid:uniquehead@nodemailer.com" width="300px" alt="Jewlex Logo" style="width: 100px;">
            <h1 style="font-size: 22px; margin-bottom: 10px; font-style: italic">Discover The Beauty</h1>
          </div>
          <div style="font-size: 18px; margin-bottom: 20px; padding: 0 40px ;">
            <h2 style="margin: 45px 0; text-align: center; font-size: 20px" >Your OTP for myJewlex Account Registration</h2>
            <p style="font-size: 16px; margin-bottom: 20px; font-weight: bold">Dear, John Doe</p>
            <p style="font-size: 17px; color: grey; margin-bottom: 20px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Thank you for choosing myJewlex, where we bring you exquisite and personalized jewelry experiences. To complete your account registration, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 5 minutes.</p>
            <div style="font-weight:bold; font-size: 16px; margin-bottom: 20px">Your OTP: <span style="background-color: #ffcc00; font-weight:bold; padding: 5px; border-radius: 5px; font-size: 16px; margin-bottom: 20px; text-align: center;">[${otp}]</span></div>
            <p style="font-size: 17px; color: grey; margin:0 ; line-height: 25px">Please enter this code on the registration page to verify your email address and activate your myJewlex account.</p>
            <p style="font-size: 17px; margin-bottom: 20px; color: grey; margin-top:0 ; line-height: 25px">If you did not initiate this registration, please disregard this email.</p>
            <p style="font-size: 16px; margin-bottom: 20px; color: grey;">Warm Regards:</p>
            <p style="font-size: 16px; margin-bottom: 50px; font-weight: bold;">The myJewlex Team</p>
          </div>
          <div class="footer">
            <div style="text-align: left; margin-top: 20px; background-color: #fffbf2; display: flex; align-items: center; justify-content: space-between; padding: 10px 40px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
            <div>
            <p style="font-weight:bold; font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
            <p style="font-size: 14px;">Feel free to reach out to us anytime: <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">support@myJewlex.com</a></p></div>
            <div style="display:flex;align-items: end;">
            <a href="https://www.facebook.com/" style="color: #3b5998; margin-right: 10px;"><img src="cid:uniquefb@nodemailer.com" alt="facebook" ></a>
            <a href="https://www.linkedin.com/" style="color: #007bb5; margin-right: 10px;"><img src="cid:uniqueln@nodemailer.com" alt="linkedin" ></a>
            <a href="https://www.instagram.com/" style="color: #e1306c;"><img src="cid:uniqueig@nodemailer.com" alt="instagram" ></a>
            </div>
          </div>
        </div>
        </div>         
      </div>
      `;
    }

    return {
      text: stringData,
      html: htmlData,
    };
  };

  if (otpResend) {
    const otpRecord = await prisma.otpVerification.findUnique({
      where: { email: email },
    });
    if (!otpRecord) {
      await prisma.otpVerification.create({
        data: {
          email: email,
          otp: otp,
          mode: mode,
          expiry: expiry,
        },
      });
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        ...generateEmailContent(otp, mode, otpResend),
        subject: `${
          mode === "registration"
            ? "Resend Registration OTP"
            : "Resend Reset-Password OTP"
        }`,
        attachments: [
          {
            filename: "logo.png",
            path: "/k/github/my-jwelex/public/logo.png",
            cid: "unique@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "email-header-logo.png",
            path: "/k/github/my-jwelex/public/assets/images/email-header-logo.png",
            cid: "uniquehead@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "facebook.svg",
            path: "/k/github/my-jwelex/public/assets/images/facebook.svg",
            cid: "uniquefb@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "linkedin.svg",
            path: "/k/github/my-jwelex/public/assets/images/linkedin.svg",
            cid: "uniqueln@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "instagram.svg",
            path: "/k/github/my-jwelex/public/assets/images/instagram.svg",
            cid: "uniqueig@nodemailer.com", //same cid value as in the html img src
          },
        ],
      });
    } else {
      await prisma.otpVerification.update({
        where: { email: email },
        data: {
          email: email,
          otp: otp,
          mode: mode,
          expiry: expiry,
        },
      });
      await transporter.sendMail({
        ...mailOptions,
        to: email,
        ...generateEmailContent(otp, mode, otpResend),
        subject: `${
          mode === "registration"
            ? "Resend Registration OTP"
            : "Resend Reset-Password OTP"
        }`,
        attachments: [
          {
            filename: "logo.png",
            path: "/k/github/my-jwelex/public/logo.png",
            cid: "unique@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "email-header-logo.png",
            path: "/k/github/my-jwelex/public/assets/images/email-header-logo.png",
            cid: "uniquehead@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "facebook.svg",
            path: "/k/github/my-jwelex/public/assets/images/facebook.svg",
            cid: "uniquefb@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "linkedin.svg",
            path: "/k/github/my-jwelex/public/assets/images/linkedin.svg",
            cid: "uniqueln@nodemailer.com", //same cid value as in the html img src
          },
          {
            filename: "instagram.svg",
            path: "/k/github/my-jwelex/public/assets/images/instagram.svg",
            cid: "uniqueig@nodemailer.com", //same cid value as in the html img src
          },
        ],
      });
    }
  } else {
    const exists = await prisma.otpVerification.findUnique({
      where: {
        email,
      },
    });
    if (exists) {
      await prisma.otpVerification.update({
        where: {
          email,
        },
        data: {
          email: email,
          otp: otp,
          mode: mode,
          expiry: expiry,
        },
      });
    } else {
      await prisma.otpVerification.create({
        data: {
          email: email,
          otp: otp,
          mode: mode,
          expiry: expiry,
        },
      });
    }
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      ...generateEmailContent(otp, mode, otpResend),
      subject: `${
        mode === "registration" ? "Registration OTP" : "Reset Password OTP"
      }`,
      attachments: [
        {
          filename: "logo.png",
          path: "/k/github/my-jwelex/public/logo.png",
          cid: "unique@nodemailer.com", //same cid value as in the html img src
        },
        {
          filename: "email-header-logo.png",
          path: "/k/github/my-jwelex/public/assets/images/email-header-logo.png",
          cid: "uniquehead@nodemailer.com", //same cid value as in the html img src
        },
        {
          filename: "facebook.svg",
          path: "/k/github/my-jwelex/public/assets/images/facebook.svg",
          cid: "uniquefb@nodemailer.com", //same cid value as in the html img src
        },
        {
          filename: "linkedin.svg",
          path: "/k/github/my-jwelex/public/assets/images/linkedin.svg",
          cid: "uniqueln@nodemailer.com", //same cid value as in the html img src
        },
        {
          filename: "instagram.svg",
          path: "/k/github/my-jwelex/public/assets/images/instagram.svg",
          cid: "uniqueig@nodemailer.com", //same cid value as in the html img src
        },
      ],
    });
  }
}
