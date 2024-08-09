import { fetchWishlist } from "@/actions/wishlist";
import Breadcrumbs from "@/components/Breadcrumbs";
import Container from "@/components/frontend/Container";
import Paragraph from "@/components/Paragraph";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { checkUserSession } from "../../layout";
import Ads from "./components/Ads";
import Wishlist from "./components/WhishList";

const getAds = () =>
  prisma.promotional.findMany({
    where: {
      ads_type: "CART",
    },
  });

export default async function WishlistPage() {
  const user = await checkUserSession();
  const promolist = await getAds();
  if (!user) {
    redirect("/login");
  }
  const wishlist = await fetchWishlist();
  if (wishlist.status !== "success") {
    return (
      <Container>
        <Breadcrumbs
          items={[
            { link: "/", label: "Home" },
            {
              link: "/wishlist",
              label: "Wishlist",
              current: true,
            },
          ]}
        />
        <Paragraph>No Wishlist record found</Paragraph>
      </Container>
    );
  }
  return (
    <Container>
      <Ads promolist={promolist} />
      <Breadcrumbs
        items={[
          {
            link: "/profile/wishlist",
            label: "Wishlist",
            current: true,
          },
        ]}
        showDevider={true}
      />
      <Wishlist wishlist={wishlist} />
    </Container>
  );
}
