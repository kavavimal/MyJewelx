import puppeteer from "puppeteer";

const getInvoiceHTML = (data) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Invoice</title>
    <style>
      body {
        margin-top: 5rem;
      }

      .invoice-box {
        width: 600px;
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
        font-size: 16px;
        line-height: 24px;
        font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
        color: #555;
      }

      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
      }

      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }

      .invoice-box table tr td:nth-child(2) {
        text-align: right;
      }

      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }

      .invoice-box table tr.information table td {
        padding-bottom: 40px;
      }

      .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }

      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.item td {
        border-bottom: 1px solid #eee;
      }

      .invoice-box table tr.item.last td {
        border-bottom: none;
      }

      .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
      }

      @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
          width: 100%;
          display: block;
          text-align: center;
        }

        .invoice-box table tr.information table td {
          width: 100%;
          display: block;
          text-align: center;
        }
      }

      /** RTL **/
      .rtl {
        direction: rtl;
        font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
          sans-serif;
      }

      .rtl table {
        text-align: right;
      }

      .rtl table tr td:nth-child(2) {
        text-align: left;
      }
    </style>
  </head>

  <body>
    <div class="invoice-box">
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                  MY JEWLEX
                </td>

                <td>${data.invoiceData}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="information">
          <td colspan="2">
            <table>
              <tr>
                <td>${data.vendor}</td>

                <td>${data.customer}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="heading">
          <td>Payment Method</td>

          <td>${data.paymentMethod}</td>
        </tr>

        <tr class="heading">
          <td>Item</td>

          <td>Price</td>
        </tr>

        ${data.items}

        <tr class="total">
          <td></td>

          <td>Total: ${data.orderTotal}</td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;
};
export async function generateInvoice(order, seller) {
  try {
    const vendor = `${seller.user.vendor?.store_name}.<br />
                ${seller.user.firstName} ${seller.user.lastName}`;
    const customer = `${order.user.firstName} ${order.user.lastName}<br>
                ${order.user.email}`;
    const invoiceData = `Invoice #: ${order.id}<br>
                Date: ${new Date(order.createdAt).toLocaleDateString()}<br>`;
    const items = order.orderItems.filter((item) => item.sellerId === seller.user.id);
    
    const html = getInvoiceHTML({
      invoiceData,
      vendor,
      customer,
      paymentMethod: order.paymentMethod,
      items: items.map((item) => {
        return `<tr class="item">
          <td>
            ${item.name}
          </td>
  
          <td>
            ${item.price}
          </td>
        </tr>`;
      }),
      orderTotal: items.reduce((sum,item) => sum + parseFloat(item.price),0),
    });

    // simulate a chrome browser with puppeteer and navigate to a new page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // set our compiled html template as the pages content
    // then waitUntil the network is idle to make sure the content has been loaded
    await page.setContent(html, { waitUntil: "networkidle0" });

    // convert the page to pdf with the .pdf() method
    const pdf = await page.pdf({ format: "A4" });
    await browser.close();

    return pdf;
  } catch (err) {
    console.log(err);
    return { error: true, message: err.message };
  }
}
