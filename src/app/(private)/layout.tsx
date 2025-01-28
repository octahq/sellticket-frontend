'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { PageInfos } from '@/components/common/constants';
import Sidebar from '@/components/Layout/ProtectedLayout/Sidebar';
import Header from '@/components/Layout/ProtectedLayout/Header';

import '../../styles/authenticatedLayoutStyles.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const currentPageInfo = PageInfos[pathname] || { title: 'Dashboard' };

  return (
    <div className="h-screen overflow-hidden">
      {/* Main Grid */}
      <main
        className={cn(
          'grid h-full',
          'mobile-col [grid-template-columns:280px_1fr]'
        )}
      >
        {/* Sidebar */}
        <div className="h-full overflow-y-auto bg-gray-100 hide-sidebar">
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
              'px-6 pt-28 hide-sidebar:px-5 hide-sidebar:mt-24'
            )}
          >
            <div className="hidden md:block mb-5 page-title">
              <h3 className="font-bold text-xl">{currentPageInfo.title}</h3>
              {currentPageInfo.description && (
                <p className="text-sm pt-[2px]">
                  {currentPageInfo.description}
                </p>
              )}
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
