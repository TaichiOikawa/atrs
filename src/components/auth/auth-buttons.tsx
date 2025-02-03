import { EnterIcon, PersonIcon, PlusIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};
const itemAnimation = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
};

const links = [
  {
    href: '/auth/login/',
    icon: EnterIcon,
    text: 'ログイン',
  },
  {
    href: '/auth/signin/',
    icon: PersonIcon,
    text: 'アカウントを作成',
  },
  {
    href: '/auth/register/',
    icon: PlusIcon,
    text: '新しいチーム・管理者アカウントを作成',
  },
];

export default function AuthButtons({ path }: { path: string }) {
  const filteredLinks = links.filter((link) => link.href !== path);

  return (
    <motion.div
      animate="visible"
      className="mx-auto flex w-full max-w-md flex-col gap-3"
      initial="hidden"
      variants={containerAnimation}
    >
      {filteredLinks.map((link) => (
        <motion.div key={link.text} variants={itemAnimation}>
          <Link className="mx-5 flex items-center rounded-sm bg-white px-5 py-2 shadow-md" href={link.href}>
            <link.icon className="mr-2 size-7 shrink-0 rounded-full p-0.5" />
            <span>{link.text}</span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
