import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "@/components/header";
import Search from "./components/search";
import BookingItem from "@/components/booking-item";
import HighlightedSubtitle from "@/components/highlighted-subtitle";

export default function Home() {
  const dayOfWeekAndMonth: string = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  });

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
          <HighlightedSubtitle> Agendamentos</HighlightedSubtitle>
          <BookingItem />
        </section>
      </main>
    </>
  );
}
