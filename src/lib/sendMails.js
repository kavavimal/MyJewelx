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
const getEmailFooter = () => {
  const companyEmail = process.env.Email;
  return `<p class="text">If you have any questions or need assistance, feel free to contact us at <strong>${companyEmail}</strong>.</p>
        <p class="text">Enjoy your experience!</p>
        <p class="footer">Best regards,<br>My-jewlex Team</p>`;
};


function generateOrderEmail(order, recipientType) {
  const recipient = recipientType === 'vendor' ? 'Vendor' : 'Customer';
  const shippingAddress = JSON.parse(order.shippingAddress);
  return `
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
            <p>${recipientType === 'vendor' ? "You receive Order." : "Thank you for your order."} Below are the details of order:</p>
            <h2>Order ID: ${order.id}</h2>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <h3>Customer Information</h3>
            <p>
              <strong>Name:</strong> ${order.user.firstName} ${order.user.lastName}<br>
              <strong>Email:</strong> ${order.user.email}<br>
              <strong>Phone:</strong> ${order.user.phone_number}<br>
              <strong>Shipping Address:</strong> ${shippingAddress.firstName} ${shippingAddress.lastName}<br/>
              ${shippingAddress.street} ${shippingAddress.address_2 !== '' ? shippingAddress.address_2 : ''}<br />
              ${shippingAddress.city} ${shippingAddress.state}, ${shippingAddress.country} ${shippingAddress.zipCode}<br />
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
                ${order.orderItems.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price}</td>
                  <td>${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
                `).join('')}
              </tbody>
            </table>
            <h3>Total Amount: ${order.orderTotal} AED</h3>
          </div>
          <div class="email-footer">
            `+getEmailFooter()+`
          </div>
        </div>
      </body>
    </html>
  `;
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
        html: generateOrderEmail(order, 'vendor'),
        subject: subject,
      };
      if (!pdf?.error) {
        attachments.push({
          filename: `invoice_${order.id}_${i}.pdf`,
          content: pdf,
        });
        vendorEmailOptions.attachments = [{
          filename: `invoice_${order.id}_${i}.pdf`,
          content: pdf,
        }];
      }
      await transporter.sendMail(vendorEmailOptions);
    }

    const customerEmailOptions = {
      ...mailOptions,
      to: order.user.email,
      html: generateOrderEmail(order, 'customer'),
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
