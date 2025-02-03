'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks({
  links,
}: {
  links: {
    title: string;
    icon: React.ReactNode;
    filledIcon: React.ReactNode;
    href: string;
  }[];
}) {
  const pathname = usePathname();

  const activeIndex = links.findIndex((link) => link.href === pathname);
  const positionTop = activeIndex * 56;

  return (
    <div className="relative">
      {links.map((link) => {
        return (
          <Link className="mb-6 flex items-center gap-x-5" href={link.href} key={link.href}>
            <div
              className={clsx('z-10 flex h-8 w-14 items-center justify-center rounded-full text-center', {
                'text-blue-800': pathname === link.href,
              })}
            >
              {pathname === link.href ? link.filledIcon : link.icon}
            </div>
            {/* TODO 調整用 */}
            {/* <div className="bg-gray-100 h-8 w-14 absolute rounded-full z-[-1]"></div> */}
            {/* ここまで */}
            <span className={clsx('underline-offset-4', { 'underline text-blue-900': pathname === link.href })}>
              {link.title}
            </span>
          </Link>
        );
      })}
      <div
        className="absolute left-0 h-8 w-14 rounded-full bg-blue-100 transition-all duration-300"
        style={{ top: positionTop }}
      />
    </div>
  );
}
