'use client';

import AuthButtons from '@/components/auth/auth-buttons';
import { useGetWindowSize } from '@/hooks/use-getWindowSize';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const [page, setPage] = useState<number>(0);
  const [initial, setInitial] = useState<boolean>(true);
  const [isNext, setIsNext] = useState<boolean>(true);

  const path = usePathname();

  const { width } = useGetWindowSize();
  if (width === 0) return;

  const pageNext = () => {
    setIsNext(true);
    setPage(page + 1);
    setInitial(false);
  };

  const pageBack = () => {
    setIsNext(false);
    setPage(page - 1);
    setInitial(false);
  };

  const variants = {
    enter: (isNext: boolean) => {
      return {
        x: isNext ? 100 : -100,
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (isNext: boolean) => {
      return {
        x: isNext ? -100 : 100,
        opacity: 0,
      };
    },
  };

  const animationOptions = {
    initial: width < 400 && initial === true ? 'center' : 'enter',
    animate: 'center',
    exit: 'exit',
    variants: variants,
    custom: isNext,
    transition: {
      opacity: { duration: 0.2 },
      x: { type: 'spring', damping: 30, stiffness: 100 },
    },
  };

  return (
    <motion.main
      animate={{ opacity: 1 }}
      className="bg-gradient flex h-screen flex-col items-center justify-center max-[440px]:justify-start max-[440px]:pt-24"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
    >
      <div
        className={clsx(
          'mx-auto mb-5 w-full max-w-md overflow-hidden border bg-white p-11 shadow-md min-[440px]:rounded-sm sm:w-[28rem] sm:max-w-none',
          {
            'max-[400px]:px-4': page === 0 || page === 1,
            'max-[400px]:px-6': page === 2,
          },
        )}
      >
        <img alt="atrs logo" className="pb-1.5" height={30} src="/atrs.svg" width={120} />
        <AnimatePresence custom={isNext} mode="popLayout">
          <motion.div className="py-3" key={page} {...animationOptions}>
            {page === 0 ? (
              <>
                <h3 className="mb-3 text-xl font-bold">アカウント作成step1</h3>
              </>
            ) : page === 1 ? (
              <>
                <h3 className="mb-3 text-xl font-bold">step2</h3>
              </>
            ) : (
              <></>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AuthButtons path={path} />
    </motion.main>
  );
}
