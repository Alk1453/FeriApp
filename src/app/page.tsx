import Link from "next/link";
import { getLocationDisclosure } from "@/modules/marketplace/application/get-location-disclosure";
import { getNearbyListings } from "@/modules/marketplace/application/get-nearby-listings";
import {
  getExpansionModules,
  getPrimaryModules,
} from "@/modules/platform/application/get-platform-modules";
import { getRadarAlerts } from "@/modules/radar/application/get-radar-alerts";
import { BottomNavigation } from "./_components/bottom-navigation";
import { LocalRadar } from "./_components/local-radar";

export default function Home() {
  const listings = getNearbyListings();
  const modules = getPrimaryModules();
  const radar = getRadarAlerts();
  const roadmap = getExpansionModules();

  return (
    <main className="ui-page pb-24 md:pb-0">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <header className="grid gap-4 rounded-lg border border-primary/20 bg-white p-3 shadow-[0_18px_50px_rgba(32,35,31,0.08)] sm:gap-6 sm:p-6 xl:grid-cols-[0.9fr_1.1fr] xl:items-stretch">
          <div className="flex flex-col justify-between gap-4 sm:gap-6">
            <div className="flex flex-row items-center gap-3 sm:gap-5">
              <div className="w-fit shrink-0 rounded-lg border border-primary/25 bg-white p-2 shadow-sm">
                <img
                  alt="FeriApp"
                  className="h-auto w-28 sm:w-48"
                  src="/brand/logo-primary.svg"
                />
              </div>
              <div>
                <p className="text-sm font-extrabold uppercase text-primary-strong">
                  La feria digital de tu barrio
                </p>
                <h1 className="mt-1 max-w-3xl text-2xl font-black leading-tight text-foreground sm:mt-2 sm:text-5xl">
                  Buscá, ofrecé y conectá cerca tuyo.
                </h1>
                <p className="mt-3 hidden max-w-2xl text-base leading-7 text-muted sm:block">
                  Mirá en el radar ventas, servicios, trueques, donaciones y
                  personas que buscan lo que vos podés ofrecer.
                </p>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 xl:max-w-xl">
              <Link
                className="ui-button ui-button-primary w-full"
                href="/publicaciones"
              >
                Explorar ahora
              </Link>
              <Link
                className="ui-button ui-button-secondary w-full"
                href="/publicaciones/nueva"
              >
                Publicar gratis
              </Link>
            </div>
          </div>

          <LocalRadar listings={listings} variant="hero" />
        </header>

        <section className="grid gap-4 lg:grid-cols-[280px_1fr] lg:gap-6">
          <aside className="rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-4 text-white sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#f4c86b]">
                  Centro del radar
                </p>
                <h2 className="mt-2 text-xl font-extrabold leading-tight sm:text-2xl">
                  Ubicate en el centro del radar
                </h2>
              </div>
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold">
                PWA
              </span>
            </div>

            <div className="mt-4 sm:mt-8">
              <p className="text-sm font-semibold text-[#dbe9df]">Tu zona</p>
              <button className="mt-3 flex w-full items-center justify-between rounded-md bg-white px-3 py-3 text-left text-sm font-semibold text-[#193f3a]">
                Barrio Centro
                <span aria-hidden="true">v</span>
              </button>
            </div>

            <nav
              className="mt-4 flex gap-2 overflow-x-auto sm:mt-8 sm:block sm:space-y-2 sm:overflow-visible"
              aria-label="Módulos principales"
            >
              {modules.map((module, index) => (
                <button
                  className={`min-w-fit rounded-md px-3 py-2.5 text-left text-sm font-semibold sm:w-full ${
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

            <div className="mt-4 rounded-lg bg-white/10 p-3 sm:mt-8 sm:p-4">
              <p className="text-sm font-semibold">Confianza local</p>
              <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
                Una identidad para vecinos, comercios, moderadores y
                embajadores.
              </p>
            </div>
          </aside>

          <div className="flex flex-col gap-4 sm:gap-6">
            <header className="ui-surface p-3 sm:p-5">
              <div className="flex flex-row items-center justify-between gap-3 xl:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase text-[#a1452e]">
                    Buscar por categoría
                  </p>
                  <h2 className="mt-2 hidden max-w-3xl text-3xl font-bold leading-tight sm:block sm:text-4xl">
                    Explorá productos, servicios y necesidades del barrio.
                  </h2>
                </div>
                <Link
                  className="ui-button ui-button-primary min-h-10 shrink-0 px-3 py-2 sm:w-fit"
                  href="/publicaciones/nueva"
                >
                  Publicar ahora
                </Link>
              </div>

              <div className="mt-3 grid gap-2 md:mt-5 md:grid-cols-[1fr_160px_140px] md:gap-3">
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
                <button className="ui-button ui-button-primary">Buscar</button>
              </div>
            </header>

            <section className="grid gap-4 xl:grid-cols-[1fr_340px] xl:gap-6">
              <div className="ui-surface">
                <div className="flex flex-row items-center justify-between gap-3 border-b border-border-soft px-4 py-3 sm:px-5 sm:py-4">
                  <div>
                    <h3 className="text-lg font-bold">Cerca tuyo</h3>
                    <p className="hidden text-sm text-[#69665f] sm:block">
                      Publicaciones priorizadas por distancia y confianza.
                    </p>
                  </div>
                  <span className="ui-chip ui-chip-success w-fit text-sm">
                    24 nuevas
                  </span>
                </div>

                <div className="flex gap-3 overflow-x-auto p-4 md:block md:divide-y md:divide-[#eee7dc] md:overflow-visible md:p-0">
                  {listings.map((item) => (
                    <article
                      className="grid min-w-[260px] gap-4 rounded-md border border-border-soft bg-white p-4 md:min-w-0 md:grid-cols-[1fr_auto] md:items-center md:rounded-none md:border-0 md:px-5 md:py-4"
                      key={item.title}
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="ui-chip ui-chip-warning">
                            {item.kindLabel}
                          </span>
                          <span className="text-sm font-medium text-[#69665f]">
                            {
                              getLocationDisclosure({
                                item,
                                tier: "visitor",
                              }).label
                            }
                          </span>
                        </div>
                        <h4 className="mt-3 text-lg font-bold">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-sm text-[#69665f]">
                          {item.trustLabel} - más detalle al crear cuenta
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

              <aside className="flex gap-3 overflow-x-auto xl:flex-col xl:gap-6 xl:overflow-visible">
                <section className="ui-surface-soft min-w-[260px] p-4 sm:p-5 xl:min-w-0">
                  <h3 className="text-lg font-bold">Alertas del barrio</h3>
                  <div className="mt-3 space-y-2 sm:mt-4 sm:space-y-3">
                    {radar.map((alert) => (
                      <label
                        className="flex items-start gap-3 rounded-md border border-border-soft bg-white p-3 text-sm leading-5 sm:leading-6"
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

                <section className="ui-surface min-w-[260px] p-4 sm:p-5 xl:min-w-0">
                  <h3 className="text-lg font-bold">Modo vecino</h3>
                  <p className="mt-2 text-sm leading-6 text-[#69665f]">
                    Para descubrir, guardar, seguir categorías y recomendar sin
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

                <section className="min-w-[260px] rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-4 text-white sm:p-5 xl:min-w-0">
                  <h3 className="text-lg font-bold">Expansión modular</h3>
                  <p className="mt-2 text-sm leading-6 text-[#dbe9df]">
                    El marketplace es el primer módulo de una red local de
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
      </section>
      <BottomNavigation />
    </main>
  );
}
