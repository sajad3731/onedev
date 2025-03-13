// layout.tsx
import { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CustomMuiThemeProvider from "@/components/ThemeRegistry";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import "@/styles/globals.css";

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

const roboto = localFont({
  src: [
    {
      path: "../../../public/fonts/roboto-v47-latin-300.woff2",
      weight: "300",
    },
    {
      path: "../../../public/fonts/roboto-v47-latin-regular.woff2",
      weight: "400",
    },
    {
      path: "../../../public/fonts/roboto-v47-latin-500.woff2",
      weight: "500",
    },
    {
      path: "../../../public/fonts/roboto-v47-latin-700.woff2",
      weight: "700",
    },
  ],
  variable: "--font-roboto",
  display: "swap",
});

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
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body className={`${iransans.variable} ${roboto.variable} antialiased`}>
        <InitColorSchemeScript defaultMode="light" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <CustomMuiThemeProvider params={{ locale }}>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </CustomMuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
