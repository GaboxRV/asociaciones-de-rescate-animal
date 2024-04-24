import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BarNav from "@/ui/header/BarNav";
import Footer from "@/ui/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="es">
      <body className={inter.className}>
          <BarNav />
          {children}
          <Footer />
      </body>
    </html>
  );
}
