import Link from "next/link";
import { BottomNavigation } from "../_components/bottom-navigation";
import { AccountForm } from "./account-form";

export const metadata = {
  title: "Cuenta | FeriApp",
  description: "Crear una cuenta local de prueba para publicar en FeriApp.",
};

export default function AccountPage() {
  return (
    <main className="ui-page px-4 py-5 pb-24 sm:px-6 lg:px-8 md:pb-5">
      <section className="ui-surface mx-auto max-w-3xl p-5">
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
      <BottomNavigation />
    </main>
  );
}
