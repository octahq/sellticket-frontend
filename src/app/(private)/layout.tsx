'use client';

import { cn } from '@/lib/utils';
import Sidebar from '@/components/Layout/ProtectedLayout/Sidebar';
import Header from '@/components/Layout/ProtectedLayout/Header';
import '../../styles/authenticatedLayoutStyles.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      {/* Main Grid */}
      <main
        className={cn(
          'grid h-full',
          '[grid-template-columns:280px_1fr] hide-sidebar:grid-cols-1'
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
            <div className="hidden md:block">
              <h3 className="font-bold text-xl">Account</h3>
              <p className="text-sm pt-[2px]">
                Your account details and balance
              </p>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
