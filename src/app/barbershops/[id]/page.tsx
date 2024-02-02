import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./components/barbershop-info";
import ServiceItem from "./components/service-item";

interface BarbershopsDeatilsPageProps {
  params: any;
}

export default async function BarbershopsDeatilsPage({
  params,
}: BarbershopsDeatilsPageProps) {
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
          <ServiceItem key={service.id} service={service} />
        ))}
      </section>
    </main>
  );
}
