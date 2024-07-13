import { mailOptions, transporter } from "@/config/nodemailer";
import { UserStatus } from "@prisma/client";

const generateWelcomeVendorEmailContent = (
  firstName,
  lastName,
  companyEmail,
  companyName = null
) => {
  const htmlData = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Our Jewlex!</title>
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

export const sendVendorRegistrationEmail = async (user, vendorData) => {
  const companyEmail = process.env.Email;

  await transporter.sendMail({
    ...mailOptions,
    to: user.email,
    ...generateWelcomeVendorEmailContent(
      user?.firstName,
      user?.lastName,
      companyEmail
    ),
    subject: "My-jewlex Registration",
  });
};

export const sendVendorStatusChangeEmail = async (user) => {
  const companyEmail = process.env.Email;
console.log("user", user);
  await transporter.sendMail({
    ...mailOptions,
    to: user.email,
    ...generateStatusUpdateVendorEmailContent(
      user?.firstName,
      user?.lastName,
      user.status,
      companyEmail
    ),
    subject: "My-jewlex Account Updated",
  });
};

const generateStatusUpdateVendorEmailContent = (
  firstName,
  lastName,
  newStatus,
  companyEmail,
  companyName = null
) => {
  const htmlData = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Welcome to Our Jewlex!</title>
            <style>
                /* Your CSS styles here */
            </style>
        </head>
        <body>
            <div class="container">
                <p class="text">Dear ${firstName + " " + lastName},</p>
                <p class="text">Your account Status is updated to <strong>${
                  newStatus === UserStatus.ACTIVE ? "Activated" : "Deactivated"
                }!</strong></p>


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
