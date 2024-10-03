import prisma from "@/lib/prisma";
import Hero from "./components/home/Hero";
import PopularProducts from "./components/home/PopularProducts";
import Ads from "./components/home/Ads";
import NewProdFeatureProd from "./components/home/NewProdFeatureProd";
import Topcategories from "./components/home/TopCategories";
import TopVendors from "./components/home/TopVendors";
import Editions from "./components/home/Editions";
import Trending from "./components/home/Trending";
import Testimonial from "./components/home/Testimonial";
import { getProducts } from "../actions/product";

export const revalidate = 0;

const getCategories = () =>
  prisma.category.findMany({
    include: {
      image: true,
    },
  });
const getVendors = () =>
  prisma.user.findMany({
    where: {
      role_id: 2,
    },
    include: {
      vendor: true,
      image: true,
      banner_image: true,
    },
  });

const homeSlider = () => prisma.homeSlider.findMany({});
const getPromoList = () =>
  prisma.promotional.findMany({
    where: {
      ads_type: "HOME",
    },
  });
const getAds = () =>
  prisma.promotional.findMany({
    where: {
      ads_type: "HOME_B",
    },
  });
export default async function Home() {
  const categories = await getCategories();
  const vendors = await getVendors();
  const homeSlide = await homeSlider();
  const promolist = await getPromoList();
  const products = await getProducts({ status: ["PUBLISHED"] });
  const ads = await getAds();
  const featureProducts = await getProducts({
    status: ["PUBLISHED"],
    featured: true,
  });
  return (
    <>
      <Hero
        categories={categories}
        homeSlide={homeSlide}
        promolist={promolist}
        vendors={vendors}
      />
      <PopularProducts products={products} />
      <Ads ads={ads} />
      <NewProdFeatureProd products={products} />
      <Topcategories categories={categories} />
      <TopVendors vendors={vendors} />
      <Editions />
      <Trending products={products} />
      <Testimonial />
    </>
  );
}
