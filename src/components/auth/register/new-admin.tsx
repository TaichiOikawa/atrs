import { UserState } from '@/app/auth/register/page';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { signUpSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function NewAdminForm({
  adminUser,
  setAdminUser,
  pageNext,
  pageBack,
}: {
  adminUser: UserState;
  setAdminUser: (value: UserState) => void;
  pageNext: () => void;
  pageBack: () => void;
}) {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: 'admin',
      email: adminUser?.email || '',
      password: adminUser?.password || '',
      passwordConfirmation: adminUser?.passwordConfirmation || '',
    },
  });

  const [passwordHidden, setPasswordHidden] = useState(true);
  const [passwordConfirmationHidden, setPasswordConfirmationHidden] = useState(true);

  const onSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
    setAdminUser(data);
    pageNext();
  };

  return (
    <>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>管理者メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    placeholder="メールアドレス"
                    type="email"
                    variant="underline"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>管理者パスワード</FormLabel>
                <FormControl>
                  <PasswordInput
                    InputOptions={{
                      autoComplete: 'new-password',
                      className: 'w-full',
                      placeholder: '管理者パスワード',
                      variant: 'underline',
                      ...field,
                    }}
                    hidden={passwordHidden}
                    toggleHidden={() => setPasswordHidden(!passwordHidden)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード再入力</FormLabel>
                <FormControl>
                  <PasswordInput
                    InputOptions={{
                      autoComplete: 'new-password',
                      className: 'w-full',
                      placeholder: 'パスワード確認',
                      variant: 'underline',
                      ...field,
                    }}
                    hidden={passwordConfirmationHidden}
                    toggleHidden={() => setPasswordConfirmationHidden(!passwordConfirmationHidden)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button className="rounded-sm px-6" onClick={pageBack} type="button" variant="outline">
              戻る
            </Button>
            <Button className="rounded-sm px-6" type="submit">
              次へ
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
