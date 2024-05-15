import { Inter } from "next/font/google";
import { Suspense } from "react";
import FrontendHeader from "@/components/frontend/common/Header";
import LoadingDots from "@/components/loading-dots";
import "@/styles/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth - My jewelex",
  description: "Product on Demand",
};

export default async function AuthLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense
          fallback={
            <div className="fixed h-full w-full flex item-center justify-center bg-gray-400/[.5]  top-0 left-0 z-40">
              <LoadingDots color="#808080" size="15px" />
            </div>
          }
        >
          <FrontendHeader />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
