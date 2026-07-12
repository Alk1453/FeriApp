import Link from "next/link";

export const metadata = {
  title: "Nueva publicacion | FeriApp",
  description:
    "Crear una publicacion hiperlocal para vender, intercambiar, donar o regalar.",
};

const categories = [
  "Hogar",
  "Transporte",
  "Libros",
  "Indumentaria",
  "Herramientas",
  "Servicios",
  "Otro",
];

export default function NewPublicationPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] px-4 py-5 text-[#1f211d] sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
        <form className="rounded-lg border border-[#d9d0c0] bg-white p-5">
          <Link className="text-sm font-bold text-[#a1452e]" href="/publicaciones">
            Publicaciones
          </Link>
          <h1 className="mt-2 text-3xl font-bold">Nueva publicacion</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#69665f]">
            Este primer formulario fija el modelo: publicacion simple,
            ubicacion aproximada publica y datos preparados para validacion en
            servidor.
          </p>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-bold">
              Titulo
              <input
                className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
                placeholder="Ej: Silla de comedor para donar"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold">
              Descripcion
              <textarea
                className="min-h-28 rounded-md border border-[#d4c8b7] px-3 py-3 font-normal leading-6 outline-none focus:border-[#193f3a]"
                placeholder="Contale al barrio que ofreces, en que estado esta y como se coordina."
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold">
                Tipo
                <select className="h-12 rounded-md border border-[#d4c8b7] bg-white px-3 font-normal outline-none focus:border-[#193f3a]">
                  <option>Venta</option>
                  <option>Trueque</option>
                  <option>Donacion</option>
                  <option>Regalo</option>
                  <option>Servicio</option>
                </select>
              </label>

              <label className="grid gap-2 text-sm font-bold">
                Categoria
                <select className="h-12 rounded-md border border-[#d4c8b7] bg-white px-3 font-normal outline-none focus:border-[#193f3a]">
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="grid gap-2 text-sm font-bold">
                Precio o condicion
                <input
                  className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
                  placeholder="$, gratis o trueque"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Localidad
                <input
                  className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
                  placeholder="San Martin"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Barrio visible
                <input
                  className="h-12 rounded-md border border-[#d4c8b7] px-3 font-normal outline-none focus:border-[#193f3a]"
                  placeholder="Barrio Centro"
                />
              </label>
            </div>

            <label className="grid gap-2 text-sm font-bold">
              Contacto preferido
              <select className="h-12 rounded-md border border-[#d4c8b7] bg-white px-3 font-normal outline-none focus:border-[#193f3a]">
                <option>WhatsApp</option>
                <option>Mensaje dentro de FeriApp</option>
                <option>Telefono</option>
              </select>
            </label>

            <button
              className="mt-2 h-12 rounded-md bg-[#193f3a] px-4 text-sm font-bold text-white transition hover:bg-[#102d29]"
              type="button"
            >
              Guardar borrador
            </button>
          </div>
        </form>

        <aside className="rounded-lg border border-[#d9d0c0] bg-[#193f3a] p-5 text-white">
          <h2 className="text-lg font-bold">Reglas del modelo</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-[#dbe9df]">
            <p>La ubicacion exacta nunca se muestra por defecto.</p>
            <p>Cada publicacion debe poder compartirse por URL publica.</p>
            <p>Las validaciones criticas deben vivir fuera de la interfaz.</p>
            <p>El tipo de publicacion no se limita a venta tradicional.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
