import CartPage from "./CartPage";
import { getCart } from "@/actions/cart";
import Container from "@/components/frontend/Container";
import Link from "next/link";

export default async function Cart() {
  const cart = await getCart();
  if (!cart.cartData || cart.cartData.cartItems.length === 0) {
    return (
      <Container>
        Your Cart is empty! please add items to cart to continue{" "}
        <Link href="/shop">Go to Shop</Link>
      </Container>
    );
  }

  return (
    <Container>
      <CartPage />;
    </Container>
  );
}
