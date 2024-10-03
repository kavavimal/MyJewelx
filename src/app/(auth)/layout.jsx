import { Inter } from "next/font/google";
import { Suspense } from "react";
import FrontendHeader from "../(frontend)/components/FrontendHeader";
import LoadingDots from "../components/LoadingDots";
import Footer from "../(frontend)/components/Footer";
import prisma from "@/lib/prisma";
import { getProducts } from "../actions/product";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth - My jewelex",
  description: "Product on Demand",
};

const getCategories = async () => {
  try {
    return await prisma.category.findMany({});
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export default async function AuthLayout({ children }) {
  const categories = await getCategories();
  const products = await getProducts();
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen">
          <Suspense
            fallback={
              <div className="h-screen w-full flex items-center justify-center bg-white z-40">
                <LoadingDots color="#808080" size="12" />
              </div>
            }
          >
            <FrontendHeader categories={categories} products={products} />
            <div className="flex-grow bg-[#FFFCF5]">{children}</div>
            <Footer />
          </Suspense>
        </main>
      </body>
    </html>
  );
}
