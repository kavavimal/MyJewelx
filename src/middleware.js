export { default } from "next-auth/middleware";
// import { withAuth } from "next-auth/middleware"

export const config = { matcher: ["/admin/:path*", "/dashboard/:path*"] };


// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth.token)
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token?.role === "admin",
//     },
//   },
// )

// export const config = { matcher: ["/admin"] }