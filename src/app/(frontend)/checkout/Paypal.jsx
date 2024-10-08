import { post } from "@/utils/api";
import { CURRENCY_SYMBOL_PAYPAL } from "@/utils/constants";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function Paypal({ user, cart, amount, handlePlaceOrder }) {
  const paypalCreateOrder = async () => {
    try {
      const response = await post(`/api/paypal/createOrder`, {
        user_id: user.id,
        order_price: amount,
      });
      return response.data.order.id;
    } catch (err) {
      // Your custom code to show an error like showing a toast:
      // toast.error('Some Error Occured')
      return null;
    }
  };
  const paypalCaptureOrder = async (orderID) => {
    try {
      const response = await post(`/api/paypal/captureorder`, {
        orderID,
      });
      if (response.data.success) {
        // Order is successful
        // Your custom code
        handlePlaceOrder({
          ...response,
          paidAmount: response.request?.amount?.value,
        });
        // Like showing a success toast:
        // toast.success('Amount Added to Wallet')
        // And/Or Adding Balance to Redux Wallet
        // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
      }
    } catch (err) {
      // Order is not successful
      // Your custom code
      // Like showing an error toast
      // toast.error('Some Error Occured')
    }
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: CURRENCY_SYMBOL_PAYPAL,
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{
          color: "gold",
          shape: "rect",
          label: "pay",
          height: 50,
        }}
        createOrder={async (data, actions) => {
          let order_id = await paypalCreateOrder();
          return order_id + "";
        }}
        onApprove={async (data, actions) => {
          let response = await paypalCaptureOrder(data.orderID);
          if (response) return true;
        }}
      />
    </PayPalScriptProvider>
  );
}
