import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://feri-app-kappa.vercel.app"),
  title: "FeriApp",
  description:
    "La feria digital de tu barrio para compraventa, trueque, donaciones y comunidad local.",
  openGraph: {
    title: "FeriApp - La feria digital de tu barrio",
    description:
      "Compra, vende, intercambia, dona y descubre oportunidades cerca de donde vivis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
