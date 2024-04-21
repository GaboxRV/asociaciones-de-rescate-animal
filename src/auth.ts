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
            .object({ nombre_usuario: z.string(), contrasena: z.string().min(2) })
            .safeParse(credentials);

            if (parsedCredentials.success) {
              const { nombre_usuario, contrasena } = parsedCredentials.data;
              const usuario = await fetchUsuario(nombre_usuario);

              if (!usuario) return null;

              if (contrasena === usuario.contrasena_usuario) return usuario;
            }
     
            console.log('Credenciales invalidas');
            return null;
        },
      }),
    ],
  });