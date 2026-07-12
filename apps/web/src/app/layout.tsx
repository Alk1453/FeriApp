import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://feriapp.local"),
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
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
