'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { login } from '@/lib/auth';
import { signInSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm() {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    try {
      await login(data).then((res) => {
        if (!res.success) {
          setErrorMessage(res.message);
          return;
        }
        setIsSubmitting(false);
        toast({
          title: 'ログインしました',
          variant: 'success',
        });
        router.push('/app/');
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('エラーが発生しました。もう一度お試しください。');
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          className="space-y-5"
          onChange={() => {
            setIsSubmitting(false);
            setErrorMessage(null);
          }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="email"
                    autoFocus
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
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="current-password"
                    placeholder="パスワード"
                    type="password"
                    variant="underline"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-1">
            <Link className="block text-sm text-blue-600 hover:underline" href="/auth/recovery/">
              パスワードをお忘れですか？
            </Link>
            <div className="ml-auto mr-0 w-fit">
              <Button className="rounded-sm px-5" disabled={isSubmitting} type="submit">
                ログイン
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {errorMessage && (
        <Alert className="mt-4" variant="destructive">
          <ExclamationTriangleIcon className="size-4" />
          <AlertTitle>エラー</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </>
  );
}
