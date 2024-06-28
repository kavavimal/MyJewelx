// export { default } from "next-auth/middleware";
import { AcountType, UserStatus } from "@prisma/client";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// import permissions from "../prisma/data/permissions";

// export const config = { matcher: ["/admin/:path*", "/dashboard/:path*"] };

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const { pathname } = new URL(req.url);
    const permissions = req.nextauth.token.permissions;
    if (
      pathname.startsWith("/admin") &&
      AcountType.VENDOR === req.nextauth.token.role &&
      req.nextauth.token?.status !== UserStatus.ACTIVE
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      pathname.startsWith("/admin") &&
      ![AcountType.ADMIN, AcountType.VENDOR].includes(req.nextauth.token.role)
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      pathname === "/admin/users" &&
      !permissions.includes("customers_view") &&
      !permissions.includes("vendors_view")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      pathname === "/admin/vendors" &&
      !permissions.includes("vendors_view")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => token,
    },
  }
);

export const config = { matcher: ["/admin/:path*", "/vendor"] };
