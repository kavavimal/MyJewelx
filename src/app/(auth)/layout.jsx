import { Inter } from "next/font/google";
import { Suspense } from "react";
import FrontendHeader from "@/components/frontend/common/Header";
import LoadingDots from "@/components/loading-dots";
import "@/styles/globals.css";
import SnackbarWrapper from "@/components/SnackbarWrapper";
import Footer from "@/components/frontend/common/Footer";
import prisma from "@/lib/prisma";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth - My jewelex",
  description: "Product on Demand",
};

const getCategories = () => prisma.category.findMany({});

export default async function AuthLayout({ children }) {
  const categories = await getCategories();
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col min-h-screen">
          <SnackbarWrapper>
            <Suspense
              fallback={
                <div className="h-screen w-full flex items-center justify-center bg-white z-40">
                  <LoadingDots color="#808080" size="12" />
                </div>
              }
            >
              <FrontendHeader categories={categories} />
              <div className="flex-grow bg-[#FFFCF5]">{children}</div>
              <Footer />
            </Suspense>
          </SnackbarWrapper>
        </main>
      </body>
    </html>
  );
}
