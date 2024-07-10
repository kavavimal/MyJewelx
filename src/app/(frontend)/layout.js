import { Inter } from "next/font/google";
import { Suspense } from "react";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
import LoadingDots from "@/components/loading-dots";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import FrontendHeader from "@/components/frontend/common/Header";
import Footer from "@/components/frontend/common/Footer";

const inter = Inter({ subsets: ["latin"] });

export const checkUserSession = async () => {
  const session = await getServerSession();
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
      include: {
        role: {
          select: {
            role_name: true,
          },
        },
        vendor: true,
        image: true,
      },
    });
    return user;
  }
  return false;
};
const getCategories = () => prisma.category.findMany({});

export default async function RootLayout({ children }) {
  const categories = await getCategories();
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center z-40">
          <LoadingDots size={20} />
        </div>
      }
    >
      <FrontendHeader categories={categories} />
      {children}
      <Footer />
    </Suspense>
  );
}
