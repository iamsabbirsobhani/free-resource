import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';

import './globals.css';
import './global-icons.css';
import { Providers } from './provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const lexend = Lexend({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Free Resources | Shop',
  description: 'Free resources',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <Providers>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
