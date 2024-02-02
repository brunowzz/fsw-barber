"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

export default function ServiceItem({
  service,
  isAuthenticated,
}: ServiceItemProps) {
  function handleBooking() {
    if (!isAuthenticated) {
      signIn("google");
    }

    // TODO: abrir modal de agendamento
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 rounded p-3">
        <figure>
          <Image
            src={service.imageUrl}
            alt={service.name}
            width={110}
            height={110}
            className="max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] rounded object-cover"
          />
        </figure>

        <div className="space-y-2">
          <h2 className="text-sm font-bold">{service.name}</h2>
          <p className="text-sm text-gray-600">{service.description}</p>

          <span className="flex items-center justify-between">
            <p className="font-bold text-primary">
              R$ {service.price.toString()}
            </p>
            <Button variant="secondary" onClick={handleBooking}>
              Reservar
            </Button>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
