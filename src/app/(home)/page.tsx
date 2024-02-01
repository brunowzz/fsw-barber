import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Header from "@/components/header";
import Search from "./components/search";

export default function Home() {
  const dayOfWeekAndMonth: string = format(new Date(), "EEEE',' dd 'de' MMMM", {
    locale: ptBR,
  });

  return (
    <>
      <Header />
      <main className="px-5 pt-5">
        <section>
          <h2 className="text-xl font-bold">Olá, Miguel!</h2>
          <p className="text-sm capitalize">{dayOfWeekAndMonth}</p>
        </section>

        <section className="mt-6">
          <Search />
        </section>
      </main>
    </>
  );
}
