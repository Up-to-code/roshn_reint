// FILE: middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const i18n = createMiddleware(routing);

export default i18n;

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    // Always match for locale-specific routes
    "/(en|ar)/:path*"
  ],
};