import Link from "next/link";
import { BottomNavigation } from "../_components/bottom-navigation";
import { ZoneForm } from "./zone-form";

export const metadata = {
  title: "Zona | FeriApp",
  description: "Seleccionar zona hiperlocal para publicaciones y busqueda cercana.",
};

export default function ZonePage() {
  return (
    <main className="ui-page px-4 py-5 pb-24 sm:px-6 lg:px-8 md:pb-5">
      <section className="ui-surface mx-auto max-w-3xl p-5">
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
      <BottomNavigation />
    </main>
  );
}
