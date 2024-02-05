import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const bookingConfirmed = isPast(booking.date);
  const monthBooking = format(booking.date, "MMMM", { locale: ptBR });
  const dayBooking = format(booking.date, "dd", { locale: ptBR });
  const hourBooking = format(booking.date, "hh:mm", { locale: ptBR });

  return (
    <Card className="min-w-full">
      <CardContent className="flex items-center justify-between p-0">
        <div className="flex flex-[3] flex-col gap-2 p-5">
          <Badge
            variant={bookingConfirmed ? "secondary" : "default"}
            className="w-fit"
          >
            {bookingConfirmed ? "Finalizado" : "Confirmado"}
          </Badge>
          <h3 className="font-bold">{booking.service.name}</h3>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <p className="text-sm">{booking.barbershop.name}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-solid border-secondary p-5">
          <p className="text-sm capitalize">{monthBooking}</p>
          <p className="text-2xl">{dayBooking}</p>
          <p className="text-sm">{hourBooking}</p>
        </div>
      </CardContent>
    </Card>
  );
}
