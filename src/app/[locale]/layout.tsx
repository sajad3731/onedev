import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CustomMuiThemeProvider from "@/components/ThemeRegistry";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Roboto } from "next/font/google";

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

import "@/styles/globals.css";

const iransans = localFont({
  src: [
    {
      path: "../../../public/fonts/IRANSansXV.woff2",
    },
    {
      path: "../../../public/fonts/IRANSansXV.woff",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ONEDEV",
  description: "سایت شخصی سجاد مهدیان",
};

type RootLayoutPropsType = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "fa" | "en" }>;
}>;

export default async function RootLayout({
  children,
  params,
}: RootLayoutPropsType) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body className={`${iransans.variable} ${roboto.variable} antialiased`}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CustomMuiThemeProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </CustomMuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
