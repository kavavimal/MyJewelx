import prisma from '@/lib/prisma';
import Hero from './components/Hero';
import TopVendors from './components/TopVendors';
import Testimonial from './components/Testimonial';
import PopularProducts from './components/PopularProducts';
import { getProducts } from '@/actions/product';

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

export default async function Home() {
    const categories = await getCategories();
    const vendors = await getVendors();
    const homeSlide = await homeSlider();
    const promolist = await getPromoList();
    const products = await getProducts();

    return (
        <>
            <Hero
                categories={categories}
                homeSlide={homeSlide}
                promolist={promolist}
                vendors={vendors}
            />
            <PopularProducts products={products} />
            <TopVendors vendors={vendors} />
            <Testimonial />
        </>
    );
}
