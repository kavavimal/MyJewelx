import SessionWrapper from "@/components/SessionWrapper";
import { Inter } from "next/font/google";
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
        <SessionWrapper>{children}</SessionWrapper>
      </body>
      {/* <Script async src="/ripple.js" />
      <Script
        async
        type="module"
        src="https://unpkg.com/@material-tailwind/html@latest/scripts/popover.js"
      /> */}
    </html>
  );
}
