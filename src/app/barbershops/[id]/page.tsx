import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import BarbershopInfo from "./components/barbershop-info";
import ServiceItem from "./components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopsDeatilsPageProps {
  params: any;
}

export default async function BarbershopsDeatilsPage({
  params,
}: BarbershopsDeatilsPageProps) {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <main>
      <BarbershopInfo barbershop={barbershop} />

      <section className="space-y-3 px-5 py-3">
        <Button>Serviços</Button>

        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </section>
    </main>
  );
}
