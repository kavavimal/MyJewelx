import SessionWrapper from "@/components/SessionWrapper";
import { Inter } from "next/font/google";
import "./globals.css";
import FrontendHeader from "@/components/frontend/common/Header";
import ThemeWrapper from "@/components/ThemeWrapper";
import SnackbarWrapper from "@/components/SnackbarWrapper";
import LoaderRoute from "@/components/frontend/common/progressbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Jewelex",
  description: "My Jewelex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoaderRoute />
        <SessionWrapper>
          <ThemeWrapper>
            <SnackbarWrapper>{children}</SnackbarWrapper>
          </ThemeWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
