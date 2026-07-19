import Link from "next/link";
import { BottomNavigation } from "@/app/_components/bottom-navigation";
import { NewPublicationForm } from "./new-publication-form";

export const metadata = {
  title: "Nueva publicacion | FeriApp",
  description:
    "Crear una publicacion hiperlocal para vender, intercambiar, donar o regalar.",
};

type NewPublicationPageProps = {
  searchParams?: Promise<{
    tipo?: string;
    titulo?: string;
  }>;
};

export default async function NewPublicationPage({
  searchParams,
}: NewPublicationPageProps) {
  const params = await searchParams;

  return (
    <main className="ui-page px-4 py-5 pb-24 sm:px-6 lg:px-8 md:pb-5">
      <div className="mx-auto mb-4 w-full max-w-7xl">
        <Link className="text-sm font-bold text-[#a1452e]" href="/publicaciones">
          Publicaciones
        </Link>
      </div>
      <NewPublicationForm initialKind={params?.tipo} initialTitle={params?.titulo} />
      <BottomNavigation />
    </main>
  );
}
