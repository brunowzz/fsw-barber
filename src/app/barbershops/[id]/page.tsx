import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./components/barbershop-info";

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
  });

  if (!barbershop) {
    return null;
  }

  return (
    <main>
      <BarbershopInfo barbershop={barbershop} />
    </main>
  );
}
