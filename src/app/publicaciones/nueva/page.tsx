import Link from "next/link";
import { NewPublicationForm } from "./new-publication-form";

export const metadata = {
  title: "Nueva publicacion | FeriApp",
  description:
    "Crear una publicacion hiperlocal para vender, intercambiar, donar o regalar.",
};

export default function NewPublicationPage() {
  return (
    <main className="min-h-screen bg-[#f5f1e8] px-4 py-5 text-[#1f211d] sm:px-6 lg:px-8">
      <div className="mx-auto mb-4 w-full max-w-7xl">
        <Link className="text-sm font-bold text-[#a1452e]" href="/publicaciones">
          Publicaciones
        </Link>
      </div>
      <NewPublicationForm />
    </main>
  );
}
