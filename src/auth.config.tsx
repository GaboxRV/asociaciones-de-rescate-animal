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
        const estaEnAsociacion = nextUrl.pathname.startsWith('/perfil/asociacion');
        const estaEnSuAsociacion = nextUrl.pathname.startsWith(`/perfil/asociacion/${auth?.user?.email}`);

        const esAdmin = auth?.user?.name?.includes('admin');
        const estaVerificado = auth?.user?.name?.includes('usuario verificado');

        if (estaEnPerfil) {

          if (estaRegistrado) {

            if (estaEnAdmin && !esAdmin) {
              return Response.redirect(new URL('/perfil', nextUrl).toString());
            } 
            else if(estaEnAsociacion && !estaVerificado){
              return Response.redirect(new URL('/perfil', nextUrl).toString());
            }
            else if(estaEnAsociacion && !estaEnSuAsociacion){
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
  