import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
}

export default function ServiceItem({ service }: ServiceItemProps) {
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
            <p className="font-bold text-primary">R$ {Number(service.price)}</p>
            <Button variant="secondary">Reservar</Button>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
