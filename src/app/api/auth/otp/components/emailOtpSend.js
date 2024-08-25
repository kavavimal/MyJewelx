// import { generateOTP } from "@/utils/helper";
import { mailOptions, transporter } from "@/config/nodemailer";
import prisma from "@/lib/prisma";

// const attachments = [
//   {
//     filename: "logo.png",
//     path: "https://myjewlex.com/logo.svg",
//     cid: "unique@nodemailer.com",
//   },
//   {
//     filename: "email-header-logo.png",
//     path: "https://myjewlex.com/sub-logo.png",
//     cid: "uniquehead@nodemailer.com",
//   },
//   {
//     filename: "facebook.svg",
//     path: "https://myjewlex.com/facebook.svg",
//     cid: "uniquefb@nodemailer.com",
//   },
//   {
//     filename: "linkedin.svg",
//     path: "https://myjewlex.com/linkedin.svg",
//     cid: "uniqueln@nodemailer.com",
//   },
//   {
//     filename: "instagram.svg",
//     path: "https://myjewlex.com/instagram.svg",
//     cid: "uniqueig@nodemailer.com",
//   },
// ];
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
    const fs = require("fs");
    const fontBase64 = fs
      .readFileSync("public/assets/fonts/Emirates-Medium.woff")
      .toString("base64");

    if (mode === "registration") {
      stringData = `Your ${
        otpResend ? "new" : ""
      } OTP for Registering your Email into my-jwelex is: <h3 class="form-heading" align="left">${otp}</h3>`;
      htmlData = `
        <style>
          @font-face {
            font-family: 'Emirates';
            src: url('data:font/woff;base64,${fontBase64}') format('woff');
          }
          body, p {
            font-family: 'Emirates', sans-serif;
          }
        </style>
          <div style="display:flex; flex-direction:column; align-items:center">
            <div style="padding: 30px; font-family: 'Emirates', sans-serif;  margin: 0 auto;">
              <div style="background-color: #fff; border-radius: 20px; box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 20px; background-color: #fffbf2; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                  <tr>
                    <td align="left" valign="middle" style="width: 33%;">
                      <img src="https://myjewlex.com/my-jewlex-logo.png" height="auto" alt="Jewlex Logo" style="width: 200px;">
                    </td>
                    <td align="center" valign="middle" style="width: 33%;">
                      <img src="https://myjewlex.com/sub-logo.png" width="300px" alt="Jewlex Logo" style="width: 100px;">
                    </td>
                    <td align="right" valign="middle" style="width: 33%;">
                      <h1 style="font-size: 22px; margin-bottom: 10px; font-style: italic; margin: 0;">Discover The Beauty</h1>
                    </td>
                  </tr>
                </table>


                <div style="font-size: 18px; margin-bottom: 20px; padding: 0 40px ;">
                  <h2 style="margin: 45px 0; text-align: center; font-size: 20px ; font-family: 'Emirates', sans-serif;" >Your OTP for myJewlex Account Registration</h2>
                  <p style="font-size: 16px; margin-bottom: 20px; font-weight: bold">Dear, John Doe</p>
                  <p style="font-size: 17px; color: grey; margin-bottom: 20px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Thank you for choosing myJewlex, where we bring you exquisite and personalized jewelry experiences. To complete your account registration, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 5 minutes.</p>
                  <div style="font-weight:bold; font-size: 16px; margin-bottom: 20px">Your OTP: <span style="background-color: #ffcc00; font-weight:bold; padding: 5px; border-radius: 5px; font-size: 16px; margin-bottom: 20px; text-align: center;">${otp}</span></div>
                  <p style="font-size: 17px; color: grey; margin-bottom: 0px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Please enter this code on the registration page to verify your email address and activate your myJewlex account.</p>
                  <p style="font-size: 17px; margin-bottom: 20px; color: grey; margin-top:0 ; letter-spacing: 0.5px ; word-spacing: 1px; line-height: 25px">If you did not initiate this registration, please disregard this email.</p>
                  <p style="font-size: 16px; margin-bottom: 20px; color: grey;">Warm Regards:</p>
                  <p style="font-size: 16px; margin-bottom: 50px; font-weight: bold;">The myJewlex Team</p>
                  
                </div>
                <div class="footer">
                  <div style="text-align: left; margin-top: 20px; background-color: #fffbf2; padding: 10px 40px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
                    <table style="width: 100%;">
                      <tr>
                        <td style="vertical-align: top;">
                          <p style="font-weight:bold; font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
                          <p style="font-size: 14px;">Feel free to reach out to us anytime: <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">support@myJewlex.com</a></p>
                        </td>
                        <td style="text-align: right; align-self:right; horizontal-align: right;">
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
          `;
    } else if (mode === "forgotPassword") {
      stringData = `Your ${
        otpResend ? "new" : ""
      } One time Password for resetting your password is: <h3 class="form-heading" align="left">${otp}</h3>`;
      htmlData = `
          <style>
          @font-face {
            font-family: 'Emirates';
            src: url('data:font/woff;base64,${fontBase64}') format('woff');
          }
          body, p {
            font-family: 'Emirates', sans-serif;
          }
        </style>
          
          <div style="font-family: 'Emirates', sans-serif; display:flex; flex-direction:column; align-items:center">
            <div style="padding: 30px; font-family: 'Emirates', sans-serif; margin: 0 auto;">
              <div style="background-color: #fff; border-radius: 20px; box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 20px; background-color: #fffbf2; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                <tr>
                  <td align="left" valign="middle" style="width: 33%;">
                      <img src="https://myjewlex.com/my-jewlex-logo.png" height="auto" alt="Jewlex Logo" style="width: 200px;">
                  </td>
                  <td align="center" valign="middle" style="width: 33%;">
                    <img src="https://myjewlex.com/sub-logo.png" width="300px" alt="Jewlex Logo" style="width: 100px;">
                  </td>
                  <td align="right" valign="middle" style="width: 33%;">
                    <h1 style="font-size: 22px; margin-bottom: 10px; font-style: italic; margin: 0;">Discover The Beauty</h1>
                  </td>
                </tr>
              </table>

                <div style="font-size: 18px; margin-bottom: 20px; padding: 0 40px ;">
                  <h2 style="margin: 45px 0; text-align: center; font-size: 20px ; font-family: 'Emirates', sans-serif;" >Your OTP for myJewlex Account Registration</h2>
                  <p style="font-size: 16px; margin-bottom: 20px; font-weight: bold">Dear, John Doe</p>
                  <p style="font-size: 17px; color: grey; margin-bottom: 20px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Thank you for choosing myJewlex, where we bring you exquisite and personalized jewelry experiences. To complete your account registration, please use the One-Time Password (OTP) provided below. This OTP is valid for the next 5 minutes.</p>
                  <div style="font-weight:bold; font-size: 16px; margin-bottom: 20px">Your OTP: <span style="background-color: #ffcc00; font-weight:bold; padding: 5px; border-radius: 5px; font-size: 16px; margin-bottom: 20px; text-align: center;">${otp}</span></div>
                  <p style="font-size: 17px; color: grey; margin-bottom: 0px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Please enter this code on the registration page to verify your email address and activate your myJewlex account.</p>
                  <p style="font-size: 17px; margin-bottom: 20px; color: grey; margin-top:0 ; letter-spacing: 0.5px ; word-spacing: 1px; line-height: 25px">If you did not initiate this registration, please disregard this email.</p>
                  <p style="font-size: 16px; margin-bottom: 20px; color: grey;">Warm Regards:</p>
                  <p style="font-size: 16px; margin-bottom: 50px; font-weight: bold;">The myJewlex Team</p>
                </div>

                <div class="footer">
                  <div style="text-align: left; margin-top: 20px; background-color: #fffbf2; display: flex; align-items: center; justify-content: space-between; padding: 10px 40px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding: 20px; background-color: #fffbf2; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                  <tr>
                    <td align="left" valign="left" style="width: 50%;">
                      <div>
                  <p style="font-weight:bold; font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
                  <p style="font-size: 14px;">Feel free to reach out to us anytime: <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">support@myJewlex.com</a></p></div>
                    </td>
                    <td align="right" valign="end" style="width: 50%;">
                    <div style="align-self:right; horizontal-align: right;">
                      <a href="https://www.facebook.com/" style="color: #3b5998; margin-right: 10px;"><img src="https://myjewlex.com/facebook.png" alt="facebook" style="height: 20px; width: 20px;" ></a>
                      <a href="https://www.linkedin.com/" style="color: #007bb5; margin-right: 10px;"><img src="https://myjewlex.com/linkedin.png" alt="linkedin" style="height: 20px; width: 20px;" ></a>
                      <a href="https://www.instagram.com/" style="color: #e1306c;"><img src="https://myjewlex.com/instagram.png" alt="instagram" style="height: 20px; width: 20px;" ></a>
                  </div>
                    </td>
                  </tr>
                </table>
                </div>
              </div>
              </div>         
            </div>
            </div>
          `;
    }

    return {
      text: stringData,
      //       html: `<!DOCTYPE html>
      // <html>
      //   <head>
      //     <title></title>
      //     <meta charset="utf-8" />
      //     <meta name="viewport" content="width=device-width, initial-scale=1" />
      //     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      //     <style type="text/css">
      //       @font-face {
      //         font-family: 'Emirates';
      //         src: url('data:font/woff;base64,${fontBase64}') format('woff');
      //       }

      //       body,
      //       table,
      //       td,
      //       a {
      //         -webkit-text-size-adjust: 100%;
      //         -ms-text-size-adjust: 100%;
      //         background-color: red;
      //       }
      //       table {
      //         border-collapse: collapse !important;
      //       }
      //       body {
      //         height: 100% !important;
      //         margin: 0 !important;
      //         padding: 0 !important;
      //         width: 100% !important;
      //         background-color: #ff0000;
      //       }
      //       @media screen and (max-width: 525px) {
      //         .wrapper {
      //           width: 100% !important;
      //           max-width: 100% !important;
      //         }
      //         .responsive-table {
      //           width: 100% !important;
      //         }
      //         .padding {
      //           padding: 10px 5% 15px 5% !important;
      //         }
      //         .section-padding {
      //           padding: 0 15px 50px 15px !important;
      //         }
      //       }
      //       .form-container {
      //         margin-bottom: 24px;
      //         padding: 20px;
      //         border: 1px dashed #ccc;
      //       }
      //       .form-heading {
      //         color: #2a2a2a;
      //         font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
      //         font-weight: 400;
      //         text-align: left;
      //         line-height: 20px;
      //         font-size: 18px;
      //         margin: 0 0 8px;
      //         padding: 0;
      //       }
      //       .form-answer {
      //         color: #2a2a2a;
      //         font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
      //         font-weight: 300;
      //         text-align: left;
      //         line-height: 20px;
      //         font-size: 16px;
      //         margin: 0 0 24px;
      //         padding: 0;
      //       }
      //       div[style*="margin: 16px 0;"] {
      //         margin: 0 !important;
      //       }
      //     </style>
      //   </head>
      //   <body style="margin: 0 !important; padding: 0 !important; background: #fff ; font-family: 'Emirates';">
      //     <div
      //       style="
      //         display: none;
      //         font-size: 1px;
      //         color: #fefefe;
      //         line-height: 1px;
      //         max-height: 0px;
      //         max-width: 0px;
      //         opacity: 0;
      //         overflow: hidden;
      //       "
      //     ></div>
      //     <table border="0" cellpadding="0" cellspacing="0" width="100%">
      //       <tr>
      //         <td
      //           bgcolor="#ffffff"
      //           align="center"
      //           style="padding: 10px 15px 30px 15px"
      //           class="section-padding"
      //         >
      //           <table
      //             border="0"
      //             cellpadding="0"
      //             cellspacing="0"
      //             width="100%"
      //             style="max-width: 500px"
      //             class="responsive-table"
      //           >
      //             <tr>
      //               <td>
      //                 <table width="100%" border="0" cellspacing="0" cellpadding="0">
      //                   <tr>
      //                     <td>
      //                       <table width="100%" border="0" cellspacing="0" cellpadding="0">
      //                         <tr>
      //                           <td
      //                             style="padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323;"
      //                             class="padding message-content"
      //                           >
      //                             <div class="form-container">${htmlData}</div>
      //                           </td>
      //                         </tr>
      //                       </table>
      //                     </td>
      //                   </tr>
      //                 </table>
      //               </td>
      //             </tr>
      //           </table>
      //         </td>
      //       </tr>
      //     </table>
      //   </body>
      // </html>`,
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
        // attachments: attachments,
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
        // attachments: attachments,
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
      // attachments: attachments,
    });
  }
}
