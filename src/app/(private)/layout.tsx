'use client';

import { cn } from '@/lib/utils';
import Sidebar from '@/components/Layout/AuthLayout/Sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import Header from '@/components/Layout/AuthLayout/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSmallScreen = useMediaQuery('(max-width: 999px)');

  return (
    <div className="h-screen overflow-hidden">
      {/* Main Grid */}
      <main className="grid lg:grid-cols-5 h-full">
        {/* Sidebar */}
        <div
          className={cn(
            'col-span-1 h-full overflow-y-auto bg-gray-100',
            isSmallScreen && 'hidden'
          )}
        >
          <Sidebar />
        </div>

        {/* Right Side Content */}
        <div
          className={cn(
            'lg:col-span-4 h-full flex flex-col overflow-y-auto bg-white' // Right side scrolls
          )}
        >
          {/* Header */}
          <Header />

          {/* Scrollable Children */}
          <div
            className={cn(
              'flex-1 pb-16 max-w-[1177px]',
              isSmallScreen ? 'px-4 mt-20' : 'px-6 pt-28'
            )}
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
