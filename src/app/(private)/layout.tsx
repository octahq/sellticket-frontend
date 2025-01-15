'use client';

import { cn } from '@/lib/utils';
import Sidebar from '@/components/Layout/ProtectedLayout/Sidebar';
import { useMediaQuery } from '@/hooks/use-media-query';
import Header from '@/components/Layout/ProtectedLayout/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSmallScreen = useMediaQuery('(max-width: 999px)');

  return (
    <div className="h-screen overflow-hidden">
      {/* Main Grid */}
      <main
        className={cn(
          'grid h-full',
          isSmallScreen ? 'grid-cols-1' : '[grid-template-columns:280px_1fr]'
        )}
      >
        {/* Sidebar */}
        <div
          className={cn(
            'h-full overflow-y-auto bg-gray-100',
            isSmallScreen && 'hidden'
          )}
        >
          <Sidebar />
        </div>

        {/* Right Side Content */}
        <div className="h-full flex flex-col overflow-y-auto bg-white">
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
