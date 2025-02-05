import Link from 'next/link';

import Logo from '@/assets/svgs/sell-ticket-logo-full.svg';

import { navItems } from '@/components/common/constants';
import UiIcon from '@/components/ui/Icon/UiIcon';

export default function Navbar() {
  return (
    <nav className="py-[13px] md:py-[18px] px-[25px] md:px-8 shadow-nav-bar-shadow">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        <Logo />
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="text-secondary-500 hover:text-secondary-700 transition-colors duration-200 ease-in"
            >
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
          <li>
            <button className="px-3 h-[25px] rounded-[20px] bg-[#EFFFDF] text-secondary-700">
              Sign in
            </button>
          </li>
        </ul>
        <button className="md:hidden">
          <UiIcon icon="Hamburger" size="32" />
        </button>
      </div>
    </nav>
  );
}
