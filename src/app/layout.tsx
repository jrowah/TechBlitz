import type { Metadata } from 'next';
import { InterFont, SatoshiFont } from './styles/fonts/font';
import './globals.css';
import { ReactQueryClientProvider } from '@/components/react-query-client-provider';
import { Toaster } from '@/components/ui/sonner';

export const metadata: Metadata = {
  title: 'DevDaily',
  description: 'Improve your code knowledge, one day at a time.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={`${InterFont.variable} ${SatoshiFont.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          {/* Fixed background gradient */}
          <div className="fixed inset-0 bg-gradient-to-t from-[#f0db4f]/5 via-transparent to-transparent pointer-events-none" />

          {/* Scrollable content */}
          <main>{children}</main>
          <Toaster className="bg-black" />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
