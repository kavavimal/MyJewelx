import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Ads from "./components/Ads";
import Wishlist from "./components/WhishList";
import { checkUserSession } from "@/app/actions/users";
import Paragraph from "@/app/components/Paragraph";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { fetchWishlist } from "@/app/actions/wishlist";
export const revalidate = 0;

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
      <div className="container">
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
      </div>
    );
  }
  return (
    <div className="container">
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
    </div>
  );
}
