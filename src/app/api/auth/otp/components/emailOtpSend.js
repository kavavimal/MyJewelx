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
    if (mode === "registration") {
      stringData = `Your ${
        otpResend ? "new" : ""
      } OTP for Registering your Email into my-jwelex is: <h3 class="form-heading" align="left">${otp}</h3>`;
      htmlData = `Your ${
        otpResend ? "new" : ""
      } OTP for Registering your Email into my-jwelex is: <h3 class="form-heading" align="left">${otp}</h3>`;
    } else if (mode === "forgotPassword") {
      stringData = `Your ${
        otpResend ? "new" : ""
      } One time Password for resetting your password is: <h3 class="form-heading" align="left">${otp}</h3>`;
      htmlData = `Your ${
        otpResend ? "new" : ""
      } One time Password for resetting your password is: <h3 class="form-heading" align="left">${otp}</h3>`;
    }

    return {
      text: stringData,
      html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" ><div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
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
    });
  }
}
