import Link from "next/link";
import { ZoneForm } from "./zone-form";

export const metadata = {
  title: "Zona | FeriApp",
  description: "Seleccionar zona hiperlocal para publicaciones y busqueda cercana.",
};

export default function ZonePage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] px-4 py-5 text-[#1f211d] sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl rounded-lg border border-[#d9d0c0] bg-white p-5">
        <Link className="text-sm font-bold text-[#a1452e]" href="/">
          FeriApp
        </Link>
        <h1 className="mt-3 text-3xl font-bold">Tu zona</h1>
        <p className="mt-2 text-sm leading-6 text-[#69665f]">
          La zona sirve para priorizar cercania. La ubicacion exacta se guarda
          como dato privado cuando publiquemos con backend.
        </p>
        <ZoneForm />
      </section>
    </main>
  );
}
