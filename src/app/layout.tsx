import type { Metadata } from "next";
import { Oxygen_Mono } from "next/font/google";
import "./globals.css";
import BarNav from "@/ui/header/BarNav";
import Footer from "@/ui/footer/Footer";



const mono = Oxygen_Mono({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Asociaciones de rescate animal",
  description: "Proyecto terminal con Next JS 14",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html lang="es">
      <body className={mono.className}>
          <BarNav />
          {children}
          <Footer />
      </body>
    </html>
  );
}
