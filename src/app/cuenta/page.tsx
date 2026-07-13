import Link from "next/link";
import { AccountForm } from "./account-form";

export const metadata = {
  title: "Cuenta | FeriApp",
  description: "Crear una cuenta local de prueba para publicar en FeriApp.",
};

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] px-4 py-5 text-[#1f211d] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-lg border border-[#d9d0c0] bg-white p-5">
        <Link className="text-sm font-bold text-[#a1452e]" href="/">
          FeriApp
        </Link>
        <h1 className="mt-3 text-3xl font-bold">Crear cuenta</h1>
        <p className="mt-2 text-sm leading-6 text-[#69665f]">
          Para explorar no hace falta cuenta. Para publicar, FeriApp necesita
          una identidad minima de confianza.
        </p>
        <AccountForm />
      </section>
    </main>
  );
}
