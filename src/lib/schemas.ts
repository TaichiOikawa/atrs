import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email({
      message: 'メールアドレスの形式が正しくありません',
    }),
    password: z
      .string()
      .min(1, {
        message: 'メールアドレスを入力してください',
      })
      .min(8, {
        message: 'パスワードは8文字以上で入力してください',
      })
      .regex(/^[\x20-\x7E]+$/, 'パスワードには半角英字、半角数字、半角記号のみが使用できます')
      .regex(/[a-zA-Z]/, 'パスワードには半角英字が1文字以上含まれている必要があります')
      .regex(/[0-9]/, 'パスワードには半角数字が1文字以上含まれている必要があります'),
    passwordConfirmation: z.string().min(1, {
      message: '確認用のパスワードを入力してください',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
  });

export const signInSchema = z.object({
  email: z.string().email({
    message: 'メールアドレスの形式が正しくありません',
  }),
  password: z.string().min(1, {
    message: 'パスワードを入力してください',
  }),
});
