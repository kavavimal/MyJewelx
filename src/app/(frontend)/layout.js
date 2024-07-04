import { Inter } from "next/font/google";
import { Suspense } from "react";
// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
import LoadingDots from "@/components/loading-dots";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import FrontendHeader from "@/components/frontend/common/Header";

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

export default async function RootLayout({ children }) {
  const user = await checkUserSession();

  return (
    <Suspense
      fallback={
        <div className="fixed h-full w-full flex item-center justify-center bg-gray-400/[.5]  top-0 left-0 z-40">
          <LoadingDots color="#808080" size="15px" />
        </div>
      }
    >
      <FrontendHeader />
      {/* <Header user={user} /> */}
      {children}
      {/* <Footer /> */}
    </Suspense>
  );
}
