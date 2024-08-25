import { checkUserSession } from "@/app/(frontend)/layout";
import { mailOptions, transporter } from "@/config/nodemailer";
import { generateInvoice } from "@/utils/invoiceGenerator";
import { OrderStatus, UserStatus } from "@prisma/client";

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
        <div style="padding: 30px; font-family: 'Emirates', sans-serif; margin: 0 auto;">
                    <div style="background-color: #fff; border-radius: 20px; box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);">
                      <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px; background-color: #fffbf2 ; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                        <img src="https://myjewlex.com/my-jewlex-logo.png" height="auto" alt="Jewlex Logo" style="width: 200px;">
                        <img src="https://myjewlex.com/sub-logo.png" width="300px" alt="Jewlex Logo" style="width: 100px;">
                        <h1 style="font-size: 22px; margin-bottom: 10px; font-style: italic">Discover The Beauty</h1>
                      </div>
                   
                      <div style="font-size: 18px; margin-bottom: 20px; padding: 0 40px ;">
                        <h2 style="margin: 45px 0; text-align: center; font-size: 20px" >Welcome to Our Platform!</h2>
                        <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold">Dear, ${
                          firstName + " " + lastName
                        },</p>
                        <p style="font-size: 17px; color: grey; margin-bottom: 20px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Thank you for registering with us. We are excited to have you on board!</p>
                        <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold;">Here are a few things you can do:</p>
                        <p style="font-size: 16px; line-height:20px; color:grey;">Customize your profile and settings.</p>
                        <p style="font-size: 16px; line-height:20px; color:grey;">Discover a wide range of products from top brands.</p>
                        <p style="font-size: 16px; line-height:20px; color:grey;">Add items to your cart and checkout securely.</p>
                        <p style="font-size: 16px; line-height:20px; color:grey;">Track your orders and stay updated on delivery status.</p>
                        <p style="font-size: 16px; line-height:20px; color:grey; margin-bottom: 20px">Explore exclusive deals and discounts tailored just for you.</p>
                        <p style="font-size: 17px; color: grey; margin:0 0 20px 0; line-height: 25px; letter-spacing: 0.5px ; word-spacing: 1px ;">If you have any questions or need assistance, feel free to contact us at <strong>${companyEmail}</strong>.</p>
                        <p style="font-size: 16px; line-height:25px; color:grey; margin-bottom: 20px">Enjoy your experience!</p>

                        <p style="font-size: 16px; margin-bottom: 20px; color: grey; line-height:25px; letter-spacing: 0.5px ; word-spacing: 1px ;">Best regards,<br>${
                          companyName ? companyName : "My-jewlex"
                        } Team
                        </p>
                        
                      </div>
                      <div class="footer">
                        <div style="text-align: left; margin-top: 20px; background-color: #fffbf2; display: flex; align-items: center; justify-content: space-between; padding: 10px 40px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
                        <div>
                        <p style="font-weight:bold; font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
                        <p style="font-size: 14px;">Feel free to reach out to us anytime: <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">support@myJewlex.com</a></p></div>
                        <div style="align-self:right; horizontal-align: right;">
                          <a href="https://www.facebook.com/" style="color: #3b5998; margin-right: 10px;"><img src="https://myjewlex.com/facebook.png" alt="facebook" style="height: 20px; width: 20px;" ></a>
                          <a href="https://www.linkedin.com/" style="color: #007bb5; margin-right: 10px;"><img src="https://myjewlex.com/linkedin.png" alt="linkedin" style="height: 20px; width: 20px;" ></a>
                          <a href="https://www.instagram.com/" style="color: #e1306c;"><img src="https://myjewlex.com/instagram.png" alt="instagram" style="height: 20px; width: 20px;" ></a>
                        </div>
                      </div>
                    </div>
                    </div>         
                  </div>
                </div>
        </body>
        </html>
    `;

  // const htmlData = `

  //           <div class="container">
  //               <h2 class="heading">Welcome to Our Platform!</h2>
  //               <p class="text">Dear ${firstName + " " + lastName},</p>
  //               <p class="text">Thank you for registering with us. We are excited to have you on board!</p>
  //               <p class="text">Here are a few things you can do:</p>
  //               <ul class="list">
  //                   <li>Customize your profile and settings.</li>
  //                   <li>Discover a wide range of products from top brands.</li>
  //                   <li>Add items to your cart and checkout securely.</li>
  //                   <li>Track your orders and stay updated on delivery status.</li>
  //                   <li>Explore exclusive deals and discounts tailored just for you.</li>
  //               </ul>
  //               <p class="text">If you have any questions or need assistance, feel free to contact us at <strong>${companyEmail}</strong>.</p>
  //               <p class="text">Enjoy your experience!</p>
  //               <p class="footer">Best regards,<br>${
  //                 companyName ? companyName : "My-jewlex"
  //               } Team</p>
  //           </div>
  // `

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
                <div style="padding: 30px; font-family: 'Emirates', sans-serif; margin: 0 auto;">
                    <div style="background-color: #fff; border-radius: 20px; box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.1);">
                      <div style="display: flex; align-items: center; justify-content: space-between; padding: 20px; background-color: #fffbf2 ; border-top-left-radius: 20px; border-top-right-radius: 20px;">
                        <img src="https://myjewlex.com/my-jewlex-logo.png" height="auto" alt="Jewlex Logo" style="width: 200px;">
                        <img src="https://myjewlex.com/sub-logo.png" width="300px" alt="Jewlex Logo" style="width: 100px;">
                        <h1 style="font-size: 22px; margin-bottom: 10px; font-style: italic">Discover The Beauty</h1>
                      </div>
                   
                      <div style="font-size: 18px; margin-bottom: 20px; padding: 0 40px ;">
                        <h2 style="margin: 45px 0; text-align: center; font-size: 20px" >Account Status Updated</h2>
                        <p style="font-size: 18px; margin-bottom: 20px; font-weight: bold">Dear, ${
                          firstName + " " + lastName
                        },</p>
                        <p style="font-size: 17px; color: grey; margin-bottom: 20px; letter-spacing: 0.5px ; word-spacing: 1px ; line-height: 25px">Your account Status is updated to <strong>${
                          newStatus === UserStatus.ACTIVE
                            ? "Activated"
                            : "Deactivated"
                        }!</strong></p>
                       
                        <p style="font-size: 16px; color: grey; margin:0 0 20px 0; line-height: 25px; letter-spacing: 0.5px ; word-spacing: 1px ;">If you have any questions or need assistance, feel free to contact us at <strong>${companyEmail}</strong>.</p>
                        <p style="font-size: 16px; line-height:25px; color:grey; margin-bottom: 20px">Enjoy your experience!</p>

                        <p style="font-size: 16px; margin-bottom: 20px; color: grey; line-height:25px; letter-spacing: 0.5px ; word-spacing: 1px ;">Best regards,<br>${
                          companyName ? companyName : "My-jewlex"
                        } Team
                        </p>
                        
                      </div>
                      <div class="footer">
                        <div style="text-align: left; margin-top: 20px; background-color: #fffbf2; display: flex; align-items: center; justify-content: space-between; padding: 10px 40px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px;">
                        <div>
                        <p style="font-weight:bold; font-size: 14px; margin-bottom: 10px;">Do you need help?</p>
                        <p style="font-size: 14px;">Feel free to reach out to us anytime: <a href="mailto:support@myJewlex.com" style="color: #ffcc00;">support@myJewlex.com</a></p></div>
                        <div style="display:flex;align-items: end;">
                          <a href="https://www.facebook.com/" style="color: #3b5998; margin-right: 10px;"><img src="https://myjewlex.com/facebook.png" alt="facebook" style="height: 20px; width: 20px;" ></a>
                          <a href="https://www.linkedin.com/" style="color: #007bb5; margin-right: 10px;"><img src="https://myjewlex.com/linkedin.png" alt="linkedin" style="height: 20px; width: 20px;" ></a>
                          <a href="https://www.instagram.com/" style="color: #e1306c;"><img src="https://myjewlex.com/instagram.png" alt="instagram" style="height: 20px; width: 20px;" ></a>
                        </div>
                      </div>
                    </div>
                    </div>         
                  </div>
                </div>
        </body>
        </html>
    `;

  // const htmlData = `   <div class="container">
  //               <p class="text">Dear ${firstName + " " + lastName},</p>
  //               <p class="text">Your account Status is updated to <strong>${
  //                 newStatus === UserStatus.ACTIVE ? "Activated" : "Deactivated"
  //               }!</strong></p>

  //               <p class="text">If you have any questions or need assistance, feel free to contact us at <strong>${companyEmail}</strong>.</p>
  //               <p class="text">Enjoy your experience!</p>
  //               <p class="footer">Best regards,<br>${
  //                 companyName ? companyName : "My-jewlex"
  //               } Team</p>
  //           </div>`;

  return {
    html: htmlData,
  };
};
const getEmailFooter = () => {
  const companyEmail = process.env.Email;
  return `<p class="text">If you have any questions or need assistance, feel free to contact us at <strong>${companyEmail}</strong>.</p>
        <p class="text">Enjoy your experience!</p>
        <p class="footer">Best regards,<br>My-jewlex Team</p>`;
};

function generateOrderEmail(order, recipientType) {
  const recipient = recipientType === "vendor" ? "Vendor" : "Customer";
  const shippingAddress = JSON.parse(order.shippingAddress);
  return (
    `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Order Confirmation</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
          }
          .email-container {
            max-width: 800px;
            margin: auto;
            padding: 20px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
          }
          .email-header {
            background: #f8f8f8;
            padding: 10px 20px;
            border-bottom: 1px solid #ddd;
          }
          .email-header h1 {
            margin: 0;
            font-size: 24px;
          }
          .email-body {
            padding: 20px;
          }
          .email-body table {
            width: 100%;
            border-collapse: collapse;
          }
          .email-body table, .email-body th, .email-body td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          .email-body th {
            background: #f4f4f4;
          }
          .email-footer {
            background: #f8f8f8;
            padding: 10px 20px;
            border-top: 1px solid #ddd;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Order Confirmation</h1>
          </div>
          <div class="email-body">
            <p>Dear ${recipient},</p>
            <p>${
              recipientType === "vendor"
                ? "You receive Order."
                : "Thank you for your order."
            } Below are the details of order:</p>
            <h2>Order ID: ${order.id}</h2>
            <p><strong>Date:</strong> ${new Date(
              order.createdAt
            ).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <h3>Customer Information</h3>
            <p>
              <strong>Name:</strong> ${order.user.firstName} ${
      order.user.lastName
    }<br>
              <strong>Email:</strong> ${order.user.email}<br>
              <strong>Phone:</strong> ${order.user.phone_number}<br>
              <strong>Shipping Address:</strong> ${shippingAddress.firstName} ${
      shippingAddress.lastName
    }<br/>
              ${shippingAddress.street} ${
      shippingAddress.address_2 !== "" ? shippingAddress.address_2 : ""
    }<br />
              ${shippingAddress.city} ${shippingAddress.state}, ${
      shippingAddress.country
    } ${shippingAddress.zipCode}<br />
              Phone: ${shippingAddress.phone}, Email: ${shippingAddress.email}
            </p>
            <h3>Order Details</h3>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price (AED)</th>
                  <th>Total (AED)</th>
                </tr>
              </thead>
              <tbody>
                ${order.orderItems
                  .map((item) => {
                    const variation = JSON.parse(item.variationData) ?? false;
                    return `<tr>
                        <td>${item.name} (${
                      variation ? variation?.variation_name : ""
                    })</td>
                        <td>${item.quantity}</td>
                        <td>${item.price}</td>
                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                      `;
                  })
                  .join("")}
              </tbody>
            </table>
            <h3>Total Amount: ${order.orderTotal} AED</h3>
          </div>
          <div class="email-footer">
            ` +
    getEmailFooter() +
    `
          </div>
        </div>
      </body>
    </html>
  `
  );
}

export const sendOrderEmail = async (user, order, meta = false) => {
  // Customer email
  const sellers = order.seller;
  const subject = `Order Confirmation for Order #${order.id}`;
  let attachments = [];
  if (order.status === OrderStatus.PROCESSING) {
    for (let i = 0; i < sellers.length; i++) {
      const pdf = await generateInvoice(order, sellers[i]);

      // send mail to seller
      const vendorEmailOptions = {
        ...mailOptions,
        to: sellers[i].user.email,
        html: generateOrderEmail(order, "vendor"),
        subject: subject,
      };
      if (!pdf?.error) {
        attachments.push({
          filename: `invoice_${order.id}_${i}.pdf`,
          content: pdf,
        });
        vendorEmailOptions.attachments = [
          {
            filename: `invoice_${order.id}_${i}.pdf`,
            content: pdf,
          },
        ];
      }
      await transporter.sendMail(vendorEmailOptions);
    }

    const customerEmailOptions = {
      ...mailOptions,
      to: order.user.email,
      html: generateOrderEmail(order, "customer"),
      subject: subject,
      // attachments: [
      //   {
      //     filename: "inovice.pdf",
      //     path: __dirname + "/inovice.pdf",
      //   },
      // ],
    };
    if (attachments?.length > 0) {
      customerEmailOptions.attachments = attachments;
    }
    await transporter.sendMail(customerEmailOptions);
  }
};

const generateJODmail = (user) => {
  return `<!DOCTYPE html>
    <html>
      <head>
        <title>Jewlery On Demand</title>
        <style>
        </style>
      </head>
      <body>
        <div class="container">
          <p>Dear ${user?.firstName} ${user?.lastName}, Product is successfully added in jewlex-on-demand, after the approval of admin you will receive an email</p>
        </div>
      </body>
    </html>
  `;
};

export const JODMail = async (user) => {
  const subject = `Product Added in Jewlery On Demand`;
  const html = generateJODmail(user);
  const emailOptions = {
    ...mailOptions,
    to: user.email,
    html: html,
    subject: subject,
  };
  await transporter.sendMail(emailOptions);
};

const generateJODStatusEmail = (user, data) => {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Jewlery On Demand</title>
        <style>
        </style>
      </head>
      <body>
        <div class="container">
          <p>Dear ${user?.firstName} ${user?.lastName}, Your product (On Jewlery On Demand) status changed from ${data?.prev} to ${data?.new}</p>
        </div>
      </body>
    </html>
  `;
};

export const JODStatusMail = async (user, data) => {
  try {
    const subject = `product status changed from ${data?.prev} to ${data?.new}`;
    const html = generateJODStatusEmail(user, data);
    const emailOptions = {
      ...mailOptions,
      to: user.email,
      html: html,
      subject: subject,
    };
    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};

const generatOrderStatusEmail = (user, data) => {
  return `
  <!DOCTYPE html>
    <html>
      <head>
        <title>Jewlery On Demand</title>
        <style>
        </style>
      </head>
      <body>
        <div class="container">
          <p>Dear ${user?.firstName} ${user?.lastName}, Your order status changed from ${data?.prev} to ${data?.new}</p>
        </div>
      </body>
    </html>
  `;
};

export const OrderStatusMail = async (user, data) => {
  try {
    const subject = `Order status changed from ${data?.prev} to ${data?.new}`;
    const html = generatOrderStatusEmail(user, data);
    const emailOptions = {
      ...mailOptions,
      to: user.email,
      html: html,
      subject: subject,
    };
    await transporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};
