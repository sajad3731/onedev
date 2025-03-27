import { AppProvider } from "@/app/AppProvider";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { cookies } from "next/headers";

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

const VALID_LOCALES = ["en", "fa"];

type RootLayoutPropsType = Readonly<{
  children: React.ReactNode;
  params: { locale: "fa" | "en" };
}>;

export default async function RootLayout({
  children,
  params,
}: RootLayoutPropsType) {
  const { locale } = params;
  if (!VALID_LOCALES.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages({ locale });

  const cookieStore = await cookies();
  const themeCookie =
    (cookieStore.get("theme")?.value as "dark" | "light") || "light";

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body
        className={`${iransans.variable} ${roboto.variable} antialiased min-h-screen bg-white text-black dark:bg-gray-900 dark:text-gray-100"`}
      >
        <NextIntlClientProvider messages={messages}>
          <NextThemesProvider
            defaultTheme="light"
            enableSystem={false}
            attribute="class"
          >
            <AppProvider params={{ locale, themeCookie }}>
              {children}
            </AppProvider>
          </NextThemesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
