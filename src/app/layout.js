import SessionWrapper from "@/components/SessionWrapper";
import SnackbarWrapper from "@/components/SnackbarWrapper";
import ThemeWrapper from "@/components/ThemeWrapper";
import LoaderRoute from "@/components/frontend/common/progressbar";
import Hydration from "@/contexts/hydration";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Jewelex",
  description: "My Jewelex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Hydration />
        <LoaderRoute />
        <SessionWrapper>
          <ThemeWrapper>
            <SnackbarWrapper>{children}</SnackbarWrapper>
          </ThemeWrapper>
        </SessionWrapper>
      </body>
      <Script src="/ripple.js" />
    </html>
  );
}
