'use client';

import AuthButtons from '@/components/auth/auth-buttons';
import NewAdminForm from '@/components/auth/register/new-admin';
import NewTeamForm from '@/components/auth/register/new-team';
import { Button } from '@/components/ui/button';
import { useGetWindowSize } from '@/hooks/use-getWindowSize';
import { signUpSchema } from '@/lib/schemas';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

export type UserState = z.infer<typeof signUpSchema> | null;

export default function RegisterPage() {
  const [page, setPage] = useState<number>(0);
  const [initial, setInitial] = useState<boolean>(true);
  const [isNext, setIsNext] = useState<boolean>(true);
  const [organizationName, setOrganizationName] = useState<string>('');
  const [adminUser, setAdminUser] = useState<UserState>(null);

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

  const submit = () => {
    console.log('submit');
  };

  return (
    <motion.main
      animate={{ opacity: 1 }}
      className="bg-gradient flex h-screen flex-col items-center justify-center max-[440px]:justify-start max-[440px]:pt-24"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: 'easeInOut' }}
    >
      <div
        className={
          'mx-auto mb-5 w-full max-w-md overflow-hidden border bg-white p-11 shadow-md max-[400px]:px-4 min-[440px]:rounded-sm sm:w-[28rem] sm:max-w-none'
        }
      >
        <img alt="atrs logo" className="pb-1.5" height={30} src="/atrs.svg" width={120} />
        <AnimatePresence custom={isNext} mode="popLayout">
          <motion.div className="pt-3" key={page} {...animationOptions}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold">新しいチームを作成</h3>
              <p>Step {page + 1}/3</p>
            </div>
            {page === 0 ? (
              <NewTeamForm
                organizationName={organizationName}
                pageNext={pageNext}
                setOrganizationName={setOrganizationName}
              />
            ) : page === 1 ? (
              <NewAdminForm adminUser={adminUser} pageBack={pageBack} pageNext={pageNext} setAdminUser={setAdminUser} />
            ) : (
              <div className="space-y-2">
                <p>下記内容でチームを作成いたします。</p>
                <div>
                  <p className="font-bold">チーム名</p>
                  <p className="pl-4">{organizationName}</p>
                </div>
                <div>
                  <p className="font-bold">管理者メールアドレス</p>
                  <p className="pl-4">{adminUser?.email}</p>
                </div>
                <div className="flex justify-between pt-2">
                  <Button className="rounded-sm px-6" onClick={pageBack} type="button" variant="outline">
                    戻る
                  </Button>
                  <Button className="rounded-sm px-6" onClick={submit} type="submit">
                    次へ
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AuthButtons path={path} />
    </motion.main>
  );
}
