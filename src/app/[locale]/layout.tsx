import { AppProvider } from "@/app/AppProvider";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
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

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body className={`${iransans.variable} ${roboto.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <NextThemesProvider defaultTheme="light" enableSystem={false}>
            <AppProvider params={{ locale }}>{children}</AppProvider>
          </NextThemesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
