import prisma from "@/lib/prisma";
import UpdateOrderStatus from "./UpdateOrderStatus";

export const revalidate = 0;

const getOrders = async (order_id) => {
  return await prisma.order.findFirst({
    where: { id: Number(order_id) },
    include: {
      user: true,
      orderItems: true,
      seller: { include: { user: true } },
    },
  });
};

const OrdersPage = async ({ params: { order_id } }) => {
  const order = await getOrders(order_id);
  const shippingAddress = JSON.parse(order.shippingAddress);

  return (
    <>
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold ">Orders Details</h2>
        <UpdateOrderStatus status={order.status} order_id={order.id} />
      </div>
      <div className="border p-2 rounded-sm">
        <h4>Order id: {order_id}</h4>
        <p>Payment method: {order.paymentMethod}</p>
        <div>
          <h3> Customer </h3>
          <strong>Name:</strong> {order.user.firstName} {order.user.lastName}
          <br />
          <strong>Email:</strong> {order.user.email}
          <br />
          <strong>Phone:</strong> {order.user.phone_number}
          <br />
          <strong>Shipping Address:</strong> {shippingAddress.firstName}{" "}
          {shippingAddress.lastName}
          <br />
          {shippingAddress.street}{" "}
          {shippingAddress.address_2 !== "" ? shippingAddress.address_2 : ""}
          <br />
          {shippingAddress.city} {shippingAddress.state},{" "}
          {shippingAddress.country} {shippingAddress.zipCode}
          <br />
          Phone: {shippingAddress.phone}, Email: {shippingAddress.email}
        </div>
      </div>
      <div className="border p-2 rounded-sm">
        <table border>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price (AED)</th>
              <th>Total (AED)</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Amount: ${order.orderTotal} AED</h3>
      </div>
    </>
  );
};

export default OrdersPage;
