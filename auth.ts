import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { fetchUsuario } from '@/lib/data';

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
      Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string(), password: z.string().min(2) })
            .safeParse(credentials);

            console.log(parsedCredentials);

            if (parsedCredentials.success) {
              const { email, password } = parsedCredentials.data;
              const user = await fetchUsuario(email);

              if (!user) return null;

              if (password === user.contrasena_usuario) return user;
            }
     
            console.log('Invalid credentials');
            return null;
        },
      }),
    ],
  });