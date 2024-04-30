import type { NextAuthConfig } from "next-auth";

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
        const estaEnAdmin = nextUrl.pathname.startsWith('/perfil/admin');
        const esAdmin = auth?.user?.name?.includes('admin');
        const estaVerificado = auth?.user?.name?.includes('verificado');

        console.log('es admin: ',esAdmin);
        console.log('esta verificado?: ', estaVerificado);

        if (estaEnPerfil) {

          if (estaRegistrado) {

            if (estaEnAdmin && !esAdmin) {
              console.log('No es administrador: ', auth, nextUrl);
              return Response.redirect(new URL('/perfil', nextUrl).toString());
            }

            return true;
          }

          return false;  

        }  
        return true;
      },

    },
    providers: [], 

  } satisfies NextAuthConfig;
  