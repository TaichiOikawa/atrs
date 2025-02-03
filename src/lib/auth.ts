'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { z } from 'zod';
import { signInSchema } from './schemas';

// export async function signUp({
//   name,
//   email,
//   password,
//   organizationId,
// }: z.infer<typeof signUpSchema>): Promise<string | true> {
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     if (await getUserByEmail(email)) {
//       return 'このメールアドレスは既に登録されています';
//     }

//     const organization = await prisma.organization.findUnique({
//       where: {
//         id: organizationId,
//       },
//     });

//     if (!organization) {
//       return '組織が見つかりませんでした';
//     }

//     await prisma.user.create({
//       data: {
//         name: name,
//         email: email,
//         password: hashedPassword,
//         organization: {
//           connect: {
//             id: organizationId,
//           },
//         },
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return 'エラーが発生しました。もう一度お試しください。';
//   }

//   return true;
// }

export async function login({ email, password }: z.infer<typeof signInSchema>) {
  try {
    await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });
    console.log('login success');
    return {
      message: null,
      success: true,
    };
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return {
        message: 'メールアドレスまたはパスワードが間違っています',
        success: false,
      };
    }
    console.error(error);
    return {
      message: 'エラーが発生しました。もう一度お試しください。',
      success: false,
    };
  }
}

export async function logout() {
  await signOut({
    redirectTo: '/',
  });
}
