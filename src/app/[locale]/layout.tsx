import { AppProvider } from "@/app/AppProvider";
import { HideAddressBar } from "@/components/ui/HideAddressBar";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Viewport } from "next";

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
  preload: false,
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
  preload: false,
});

export const metadata: Metadata = {
  title: "oneDev - Sajad Mahdian",
  description: "سایت شخصی سجاد مهدیان - Frontend Developer",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "../favicon.ico" },
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    shortcut: "../favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "oneDev",
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#1976d2",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" },
  ],
  interactiveWidget: "resizes-visual",
  height: "device-height",
};

const VALID_LOCALES = ["en", "fa"];

type RootLayoutPropsType = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: "fa" | "en" }>;
}>;

export default async function RootLayout({
  children,
  params,
}: RootLayoutPropsType) {
  const { locale } = await params;
  if (!VALID_LOCALES.includes(locale)) {
    notFound();
  }

  const fontFace = locale === "fa" ? iransans.variable : roboto.variable;

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
      <head>
        {/* Additional PWA meta tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="oneDev" />
        <meta name="msapplication-TileColor" content="#1976d2" />
      </head>
      <body
        className={`${fontFace} antialiased min-h-screen bg-white text-black dark:bg-gray-900 dark:text-gray-100`}
      >
        <NextIntlClientProvider messages={messages}>
          <NextThemesProvider
            defaultTheme="light"
            enableSystem={false}
            attribute="class"
          >
            <AppProvider params={{ locale, themeCookie }}>
              <HideAddressBar />
              {children}
            </AppProvider>
          </NextThemesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
