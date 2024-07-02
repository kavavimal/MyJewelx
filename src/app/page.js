import Footer from '@/components/frontend/common/Footer';
import FrontendHeader from '@/components/frontend/common/Header';
import Image from 'next/image';
import Hero from './(frontend)/components/Hero';
import prisma from '@/lib/prisma';
import TopVendors from './(frontend)/components/TopVendors';
import Testimonial from './(frontend)/components/Testimonial';

const getCategories = () => prisma.category.findMany({});
const getVendors = () =>
    prisma.user.findMany({
        where: {
            role_id: 2,
        },
        include: {
            vendor: true,
        },
    });

export default async function Home() {
    const categories = await getCategories();
    const vendors = await getVendors();
    return (
        <>
            <FrontendHeader />
            <Hero categories={categories} />
            <main className="flex ">
                <section className="bg-white dark:bg-gray-900">
                    <div className="">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            My Jewlex
                        </h1>
                    </div>
                </section>
            </main>
            <TopVendors vendors={vendors} />
            <Testimonial />
            <Footer />
        </>
    );
}
