"use client";

import { Barbershop } from "@prisma/client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

export default function BarbershopItem({ barbershop }: BarbershopItemProps) {
  const { push } = useRouter();

  const handleBookingClick = () => {
    push(`/barbershops/${barbershop.id}`);
  };

  return (
    <Card className="min-w-full max-w-full rounded-2xl">
      <CardContent className="px-1 py-0">
        <div className="relative h-[159px] w-full">
          <div className="absolute left-2 top-2 z-50">
            <Badge
              variant="secondary"
              className="left-3 top-3 flex items-center gap-1 opacity-90"
            >
              <StarIcon size={12} className="fill-primary text-primary" />
              <span className="text-xs">5,0</span>
            </Badge>
          </div>
          <Image
            alt={barbershop.name}
            src={barbershop.imageUrl}
            style={{
              objectFit: "cover",
            }}
            fill
            className="rounded-2xl"
          />
        </div>

        <div className="px-2 pb-3">
          <h2 className="mt-2 overflow-hidden text-ellipsis text-nowrap font-bold">
            {barbershop.name}
          </h2>
          <p className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-400">
            {barbershop.address}
          </p>
          <Button
            className="mt-3 w-full"
            variant="secondary"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
