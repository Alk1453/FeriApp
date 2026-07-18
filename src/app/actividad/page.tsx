import Link from "next/link";
import { BottomNavigation } from "../_components/bottom-navigation";

export const metadata = {
  title: "Actividad | FeriApp",
  description: "Actividad local de intereses, publicaciones y contactos en FeriApp.",
};

const activityItems = [
  {
    title: "Intereses enviados",
    text: "Aca se reuniran las publicaciones donde marcaste interes.",
  },
  {
    title: "Publicaciones propias",
    text: "Aca veras publicaciones activas, pausadas y cerradas cuando conectemos cuentas reales.",
  },
  {
    title: "Entregas locales",
    text: "Aca apareceran solicitudes de retiro, traslado o coordinacion barrial.",
  },
];

export default function ActivityPage() {
  return (
    <main className="ui-page px-4 py-5 pb-24 sm:px-6 lg:px-8 md:pb-5">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5">
        <header className="ui-surface p-5">
          <Link className="text-sm font-bold text-[#a1452e]" href="/">
            FeriApp
          </Link>
          <h1 className="mt-3 text-3xl font-bold">Actividad</h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Un lugar simple para seguir intereses, publicaciones y entregas
            locales. En esta etapa queda preparado como estructura de demo.
          </p>
        </header>

        <section className="grid gap-3">
          {activityItems.map((item) => (
            <article className="ui-surface p-4" key={item.title}>
              <h2 className="text-base font-bold">{item.title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted">{item.text}</p>
            </article>
          ))}
        </section>

        <Link
          className="ui-button ui-button-primary w-full"
          href="/publicaciones"
        >
          Explorar publicaciones
        </Link>
      </section>
      <BottomNavigation />
    </main>
  );
}
