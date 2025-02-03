'use client';

import AuthButtons from '@/components/auth/auth-buttons';
import LoginForm from '@/components/auth/login-form';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function LoginPage() {
  const path = usePathname();
  return (
    <motion.main
      animate={{ opacity: 1 }}
      className="bg-gradient flex h-screen flex-col items-center justify-center max-[440px]:justify-start max-[440px]:pt-24"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
    >
      <div className="mb-5 w-full max-w-md overflow-hidden border bg-white p-11 shadow-md max-[400px]:px-7 min-[440px]:rounded-sm sm:w-[28rem] sm:max-w-none">
        <img alt="atrs logo" className="pb-1.5" height={30} src="/atrs.svg" width={120} />
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          className="py-3"
          initial={{ x: 100, opacity: 0 }}
          transition={{ opacity: { duration: 0.2 }, x: { type: 'spring', damping: 30, stiffness: 100 } }}
        >
          <h3 className="mb-3 text-xl font-bold">ログイン</h3>
          <LoginForm />
        </motion.div>
      </div>
      <AuthButtons path={path} />
    </motion.main>
  );
}
