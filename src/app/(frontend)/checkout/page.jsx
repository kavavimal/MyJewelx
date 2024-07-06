import { redirect } from "next/navigation";
import Checkout from "./Checkout";
import { getCart } from "@/actions/cart";
import Container from "@/components/frontend/Container";

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart.cartData || cart.cartData.cartItems.length === 0) {
    return redirect("/cart");
  }
  return (
    <Container>
      <Checkout />
    </Container>
  );
}
