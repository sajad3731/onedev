import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  matcher: ["/", "/(fa|en)/:path*", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
