import type { NextAuthConfig } from "next-auth";
import { Session } from 'next-auth'; 

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
      redirect: async ({ url, baseUrl }) => {
        return `${baseUrl}/perfil`;
      },
      authorized({ auth, request: { nextUrl } }) {

        const estaRegistrado = !!auth?.user;
        const estaEnPerfil = nextUrl.pathname.startsWith('/perfil');
        const estaEnLogin = nextUrl.pathname.startsWith('/login');
        
        if (estaEnPerfil) {

          if (estaRegistrado) {
            return true;
          }

          return false;  // Redirect unauthenticated users to login page

        }  
        return true;
      },

    },
    providers: [], // Add providers with an empty array for now

  } satisfies NextAuthConfig;
  