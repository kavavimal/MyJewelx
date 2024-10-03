import { Inter } from "next/font/google";
import Script from "next/script";
import ProgressBar from "./components/ProgressBar";
import "./globals.css";
import SessionWrapper from "./components/SessionWrapper";
import ThemeWrapper from "./components/ThemeWrapper";
import SnackbarWrapper from "./components/SnackbarWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Jewelex",
  description: "My Jewelex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProgressBar />
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
