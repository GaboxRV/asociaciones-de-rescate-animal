import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {

        console.log(auth, nextUrl);

        const isLoggedIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/perfil');
        if (isOnDashboard) {
          if (isLoggedIn) return true;
          return Response.redirect('/login');  // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
          return Response.redirect('/perfil');
        }
        return true;
      },
    },
    providers: [], // Add providers with an empty array for now
  } satisfies NextAuthConfig;
  