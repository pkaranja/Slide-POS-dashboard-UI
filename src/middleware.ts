export { default } from "next-auth/middleware";
export const config = { matcher: ["/dashboard/:path*"] };

//add matchers to disable middleware on other pages