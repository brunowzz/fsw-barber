import HighlightedSubtitle from "@/components/highlighted-subtitle";
import { db } from "@/lib/prisma";
import BarbershopItem from "../(home)/components/barbershop-item";
import { redirect } from "next/navigation";
import Search from "../(home)/components/search";

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  if (!searchParams) {
    redirect("/");
  }

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="min-h-[calc(100vh-146px-1.25rem)] space-y-4 p-5">
      <Search defaultValues={{ search: searchParams.search as string }} />

      <HighlightedSubtitle>
        Resultados para {searchParams.search}
      </HighlightedSubtitle>

      <section className="mt-3 grid grid-cols-2 gap-3">
        {barbershops.map((barbershop) => (
          <div key={barbershop.id} className="w-full">
            <BarbershopItem barbershop={barbershop} />
          </div>
        ))}
      </section>

      {barbershops.length === 0 && (
        <h1 className="text-center font-bold">
          Não temos resultados para {searchParams.search}. Faça uma nova busca!
        </h1>
      )}
    </main>
  );
}
