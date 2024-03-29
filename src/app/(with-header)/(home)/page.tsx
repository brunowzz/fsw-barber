import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { db } from "@/lib/prisma";

import Search from "./components/search";
import BookingItem from "@/components/booking-item";
import HighlightedSubtitle from "@/components/highlighted-subtitle";
import BarbershopItem from "./components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const dayOfWeekAndMonth: string = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  });

  const [barbershops, recommendedBarbershops, confirmedBookings] =
    await Promise.all([
      db.barbershop.findMany({}),
      db.barbershop.findMany({
        orderBy: {
          id: "asc",
        },
      }),
      session?.user
        ? db.booking.findMany({
            where: {
              userId: (session.user as any).id,
              date: {
                gte: new Date(),
              },
            },
            include: {
              service: true,
              barbershop: true,
            },
          })
        : Promise.resolve([]),
    ]);

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

      {confirmedBookings.length > 0 && (
        <section>
          <HighlightedSubtitle>Seus Agendamentos</HighlightedSubtitle>

          <div className="scroll">
            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </div>
        </section>
      )}

      <section>
        <HighlightedSubtitle>Recomendados</HighlightedSubtitle>

        <div className="scroll">
          {barbershops.map((barbershop) => (
            <div key={barbershop.name} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <HighlightedSubtitle>Populares</HighlightedSubtitle>

        <div className="scroll">
          {recommendedBarbershops.map((barbershop) => (
            <div key={barbershop.name} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
