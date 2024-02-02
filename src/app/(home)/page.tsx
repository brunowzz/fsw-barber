import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { db } from "@/lib/prisma";

import Header from "@/components/header";
import Search from "./components/search";
import BookingItem from "@/components/booking-item";
import HighlightedSubtitle from "@/components/highlighted-subtitle";
import BarbershopItem from "./components/barbershop-item";

export default async function Home() {
  const dayOfWeekAndMonth: string = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  });
  const barbershops = await db.barbershop.findMany({});

  return (
    <>
      <Header />
      <main className="flex flex-col gap-6 p-5">
        <section>
          <h2 className="text-xl font-bold">Olá, Miguel!</h2>
          <p className="text-sm capitalize">{dayOfWeekAndMonth}</p>
        </section>

        <section>
          <Search />
        </section>

        <section>
          <HighlightedSubtitle>Agendamentos</HighlightedSubtitle>

          <div className="scroll">
            <BookingItem />
          </div>
        </section>

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
    </>
  );
}
