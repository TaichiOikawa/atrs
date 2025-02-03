import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ATRS アトラス',
  description: 'Active Time Recording System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="jp">
      <head>
        <meta charSet="UTF-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        {/* Prevent search engine indexing */}
        <meta content="noindex" name="robots" />
      </head>
      <body className={`antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
