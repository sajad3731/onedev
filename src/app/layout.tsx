import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const iransans = localFont({
  src: [
    {
      path: "../../public/fonts/IRANSansXV.woff2",
    },
    {
      path: "../../public/fonts/IRANSansXV.woff",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ONEDEV",
  description: "سایت شخصی سجاد مهدیان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className={`${iransans.variable} antialiased`}>{children}</body>
    </html>
  );
}
