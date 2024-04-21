import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {

        const estaRegistrado = !!auth?.user;
        const estaEnPerfil = nextUrl.pathname.startsWith('/perfil');

        if (estaEnPerfil) {

          if (estaRegistrado) return true;
          return false;  // Redirect unauthenticated users to login page

        } else if (estaRegistrado) {

          return Response.redirect('/perfil');

        }
        return true;
      },

    },
    providers: [], // Add providers with an empty array for now
    
  } satisfies NextAuthConfig;
  