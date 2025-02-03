import { NextAuthConfig } from 'next-auth';
import 'next-auth/jwt';
import { getUserByEmail } from './lib/user';
import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoute } from './routes';

export const authConfig = {
  logger: {
    error(code, ...message) {
      if (code.name === 'CredentialsSignin') return;
      console.error(code, ...message);
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 5, // 5 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
        token.organizationId = user.organizationId;
      } else {
        if (!token.email) return token;
        const user = await getUserByEmail(token.email);
        if (!user) return token;
        token.id = user.id;
        token.role = user.role;
        token.organizationId = user.organizationId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.organizationId = token.organizationId;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const path = nextUrl.pathname;
      const isPrivateRoute = !publicRoute.includes(path);
      const isAuthRoute = path.startsWith(authRoutes);

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin).toString());
        }

        return true;
      }

      if (isPrivateRoute && !isLoggedIn) {
        return Response.redirect(new URL('/auth/login/', nextUrl.origin).toString());
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
