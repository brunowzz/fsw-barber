"use client";

import { Barbershop } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import NavigationSideMenu from "@/components/navigation-side-menu";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

export default function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  const { replace } = useRouter();

  return (
    <>
      <figure className="relative h-[250px] w-full">
        <Button
          size="icon"
          variant="outline"
          className="absolute left-4 top-4 z-50"
          onClick={() => replace("/")}
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4 z-50"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <NavigationSideMenu />
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          className="object-cover opacity-85"
        />
      </figure>

      <section className="space-y-1 border-b border-solid border-secondary px-5 py-3">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>

        <div className="flex gap-1">
          <MapPinIcon size={18} className="text-primary" />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex gap-2">
          <StarIcon size={18} className="text-primary" />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </section>
    </>
  );
}
