import Link from "next/link";
import { getNearbyListings } from "@/modules/marketplace/application/get-nearby-listings";
import {
  getExpansionModules,
  getPrimaryModules,
} from "@/modules/platform/application/get-platform-modules";
import { getRadarAlerts } from "@/modules/radar/application/get-radar-alerts";
import { BottomNavigation } from "./_components/bottom-navigation";

export default function Home() {
  const listings = getNearbyListings();
  const modules = getPrimaryModules();
  const radar = getRadarAlerts();
  const roadmap = getExpansionModules();

  return (
    <main className="ui-page pb-24 md:pb-0">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-6 px-4 py-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-5 text-white lg:min-h-[calc(100vh-2rem)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#f4c86b]">
                FeriApp
              </p>
              <h1 className="mt-1 text-2xl font-bold">Feria digital</h1>
            </div>
            <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold">
              PWA
            </span>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold text-[#dbe9df]">Tu zona</p>
            <button className="mt-3 flex w-full items-center justify-between rounded-md bg-white px-3 py-3 text-left text-sm font-semibold text-[#193f3a]">
              Barrio Centro
              <span aria-hidden="true">v</span>
            </button>
          </div>

          <nav className="mt-8 space-y-2" aria-label="Modulos principales">
            {modules.map((module, index) => (
              <button
                className={`w-full rounded-md px-3 py-2.5 text-left text-sm font-semibold ${
                  index === 0
                    ? "bg-[#f4c86b] text-[#1f211d]"
                    : "text-[#edf6ef] hover:bg-white/10"
                }`}
                key={module}
              >
                {module}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-lg bg-white/10 p-4">
            <p className="text-sm font-semibold">Confianza local</p>
            <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
              Una identidad para vecinos, comercios, moderadores y embajadores.
            </p>
          </div>
        </aside>

        <div className="flex flex-col gap-6">
          <header className="ui-surface p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-[#a1452e]">
                  La feria digital de tu barrio
                </p>
                <h2 className="mt-2 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">
                  Compra, cambia, dona y descubre oportunidades cerca de casa.
                </h2>
              </div>
              <Link
                className="ui-button ui-button-primary w-full sm:w-fit"
                href="/publicaciones/nueva"
              >
                Publicar ahora
              </Link>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_160px_140px]">
              <input
                className="ui-field px-4 text-sm"
                placeholder="Buscar productos, servicios o donaciones"
                type="search"
              />
              <select className="ui-field px-3 text-sm font-medium">
                <option>Hasta 2 km</option>
                <option>Hasta 5 km</option>
                <option>Toda la localidad</option>
              </select>
              <button className="ui-button ui-button-primary">
                Buscar
              </button>
            </div>
          </header>

          <section className="grid gap-6 xl:grid-cols-[1fr_340px]">
            <div className="ui-surface">
              <div className="flex flex-col gap-2 border-b border-border-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold">Cerca tuyo</h3>
                  <p className="text-sm text-[#69665f]">
                    Publicaciones priorizadas por distancia y confianza.
                  </p>
                </div>
                <span className="ui-chip ui-chip-success w-fit text-sm">
                  24 nuevas
                </span>
              </div>

              <div className="divide-y divide-[#eee7dc]">
                {listings.map((item) => (
                  <article
                    className="grid gap-4 px-5 py-4 md:grid-cols-[1fr_auto] md:items-center"
                    key={item.title}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="ui-chip ui-chip-warning">
                          {item.kindLabel}
                        </span>
                        <span className="text-sm font-medium text-[#69665f]">
                          {item.location.distanceLabel}
                        </span>
                      </div>
                      <h4 className="mt-3 text-lg font-bold">{item.title}</h4>
                      <p className="mt-1 text-sm text-[#69665f]">
                        {item.location.neighborhood}, {item.location.locality} -{" "}
                        {item.trustLabel}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                      <strong className="text-lg">{item.priceLabel}</strong>
                      <Link
                        className="ui-button ui-button-secondary min-h-10 px-3 py-2"
                        href={`/publicaciones/${item.slug}`}
                      >
                        Ver
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="flex flex-col gap-6">
              <section className="ui-surface-soft p-5">
                <h3 className="text-lg font-bold">Radar del barrio</h3>
                <div className="mt-4 space-y-3">
                  {radar.map((alert) => (
                    <label
                      className="flex items-start gap-3 rounded-md border border-border-soft bg-white p-3 text-sm leading-6"
                      key={alert}
                    >
                      <input
                        className="mt-1 size-4 accent-[#193f3a]"
                        type="checkbox"
                      />
                      <span>{alert}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="ui-surface p-5">
                <h3 className="text-lg font-bold">Modo vecino</h3>
                <p className="mt-2 text-sm leading-6 text-[#69665f]">
                  Para descubrir, guardar, seguir categorias y recomendar sin
                  tener que comprar o vender.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-md bg-[#eef4ea] p-3">
                    <strong className="block text-2xl">86</strong>
                    <span className="text-xs font-semibold text-[#5d6758]">
                      guardados
                    </span>
                  </div>
                  <div className="rounded-md bg-[#f6e6d9] p-3">
                    <strong className="block text-2xl">31</strong>
                    <span className="text-xs font-semibold text-[#765b4d]">
                      compartidos
                    </span>
                  </div>
                </div>
              </section>

              <section className="rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-5 text-white">
                <h3 className="text-lg font-bold">Expansion modular</h3>
                <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
                  El marketplace es el primer modulo de una red local de
                  confianza.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {roadmap.map((item) => (
                    <span
                      className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </section>
            </aside>
          </section>
        </div>
      </section>
      <BottomNavigation />
    </main>
  );
}
