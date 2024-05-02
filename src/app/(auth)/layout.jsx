import { Inter } from "next/font/google";
import { redirect } from "next/navigation";
import { Suspense } from "react";
// import { checkUserSession } from "../(frontend)/layout";
// import AuthStatus from "@/components/auth-status";
// import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import LoaderRoute from "@/components/LoaderRoute";
import LoadingDots from "@/components/loading-dots";
import "@/styles/globals.css";
// import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "POD - My jewelex",
  description: "Product on Demand",
};

export default async function AuthLayout({ children }) {
  // const user = await checkUserSession();
  // if (user) {
  //   if (user?.role?.role?.role_name === "admin") {
  //     redirect("/admin");
  //   } else {
  //     redirect("/");
  //   }
  // }

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Toaster /> */}

        <Suspense
          fallback={
            <div className="fixed h-full w-full flex item-center justify-center bg-gray-400/[.5]  top-0 left-0 z-40">
              <LoadingDots color="#808080" size="15px" />
            </div>
          }
        >
          {/* <Header user={user} /> */}
          {/* <LoaderRoute/> */}
          {children}
          {/* <Footer /> */}
        </Suspense>
      </body>
    </html>
  );
}
