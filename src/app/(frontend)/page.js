import prisma from '@/lib/prisma';
import Hero from './components/Hero';
import TopVendors from './components/TopVendors';
import Testimonial from './components/Testimonial';
import PopularProducts from './components/PopularProducts';
import { getProducts } from '@/actions/product';
import Ads from './components/Ads';
import NewProdFeatureProd from './components/NewProdFeatureProd';
import Topcategories from './components/TopCategories';

const getCategories = () => prisma.category.findMany({});
const getVendors = () =>
    prisma.user.findMany({
        where: {
            role_id: 2,
        },
        include: {
            vendor: true,
            image: true,
        },
    });
const homeSlider = () => prisma.homeSlider.findMany({});
const getPromoList = () =>
    prisma.promotional.findMany({
        where: {
            ads_type: 'HOME',
        },
    });
const getAds = () =>
    prisma.promotional.findMany({
        where: {
            ads_type: 'HOME_B',
        },
    });
export default async function Home() {
    const categories = await getCategories();
    const vendors = await getVendors();
    const homeSlide = await homeSlider();
    const promolist = await getPromoList();
    const products = await getProducts();
    const ads = await getAds();

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
            <Testimonial />
        </>
    );
}
