import NavLinks from '@/components/ui/nav-links';
import {
  IconHistory,
  IconHome,
  IconHomeFilled,
  IconInfoCircle,
  IconInfoCircleFilled,
  IconSettings,
  IconSettingsFilled,
} from '@tabler/icons-react';

const iconStyle = 'size-5 shrink-0';

const NavItem = [
  {
    icon: <IconHome className={iconStyle} />,
    filledIcon: <IconHomeFilled className={iconStyle} />,
    title: 'ホーム',
    href: '/app/',
  },
  {
    icon: <IconHistory className={iconStyle} />,
    filledIcon: <IconHistory className={iconStyle} />,
    title: '履歴',
    href: '/app/history/',
  },
  {
    icon: <IconSettings className={iconStyle} />,
    filledIcon: <IconSettingsFilled className={iconStyle} />,
    title: '設定',
    href: '/app/settings/',
  },
  {
    icon: <IconInfoCircle className={iconStyle} />,
    filledIcon: <IconInfoCircleFilled className={iconStyle} />,
    title: 'ログイン情報',
    href: '/app/info/',
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto min-h-screen max-w-[1152px] px-4">
      <header className="">
        <div className="mx-auto flex items-center gap-y-1 px-4 py-3">
          <img alt="ATRS logo" src="/atrs.svg" width={115} />
        </div>
      </header>
      <div className="flex gap-x-4">
        <div className="h-screen w-1/3 border p-5">
          <NavLinks links={NavItem} />
        </div>
        <div className="h-screen w-full border">{children}</div>
      </div>
    </div>
  );
}
