import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'onedev',
  description: 'sajad mahdian personal site',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa">
      <body>{children}</body>
    </html>
  );
}
