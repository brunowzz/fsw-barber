import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { db } from "@/lib/prisma";

import Search from "./components/search";
import BookingItem from "@/components/booking-item";
import HighlightedSubtitle from "@/components/highlighted-subtitle";
import BarbershopItem from "./components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const dayOfWeekAndMonth: string = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  });
  const barbershops = await db.barbershop.findMany({});

  return (
    <main className="flex flex-col gap-6 p-5">
      <section>
        <h2 className="overflow-hidden text-ellipsis text-nowrap text-xl font-bold">
          Olá, {session ? session?.user?.name : "Visitante"}!
        </h2>
        <p className="text-sm capitalize">{dayOfWeekAndMonth}</p>
      </section>

      <section>
        <Search />
      </section>

      {session && (
        <section>
          <HighlightedSubtitle>Agendamentos</HighlightedSubtitle>

          {/* <div className="scroll">
            <BookingItem />
          </div> */}
        </section>
      )}

      <section>
        <HighlightedSubtitle>Recomendados</HighlightedSubtitle>

        <div className="scroll">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.name} barbershop={barbershop} />
          ))}
        </div>
      </section>

      <section>
        <HighlightedSubtitle>Populares</HighlightedSubtitle>

        <div className="scroll">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.name} barbershop={barbershop} />
          ))}
        </div>
      </section>
    </main>
  );
}
