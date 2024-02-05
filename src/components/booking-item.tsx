"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { cancelBooking } from "@/actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const [isBookingDeleteLoading, setIsDeleteLoading] = useState(false);

  const bookingConfirmed = isPast(booking.date);
  const monthBooking = format(booking.date, "MMMM", { locale: ptBR });
  const dayBooking = format(booking.date, "dd", { locale: ptBR });
  const hourBooking = format(booking.date, "hh:mm", { locale: ptBR });

  async function handleCancelClick() {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);

      toast("Reserva cancelada com sucesso");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="min-w-full">
        <Card className="min-w-full">
          <CardContent className="flex items-center justify-between p-0">
            <div className="flex flex-[3] flex-col gap-2 p-5">
              <Badge
                variant={bookingConfirmed ? "secondary" : "default"}
                className="w-fit"
              >
                {bookingConfirmed ? "Finalizado" : "Confirmado"}
              </Badge>
              <h3 className="text-left font-bold">{booking.service.name}</h3>

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
      </SheetTrigger>

      <SheetContent className="px-0">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 text-left">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>

        <section className="space-y-3 px-5">
          <div className="relative my-6 h-[180px] w-full">
            <Image
              src="/location.svg"
              alt={booking.barbershop.address}
              fill
              className="absolute top-0 object-cover"
            />

            <div className="absolute bottom-4 left-0 w-full px-5">
              <Card>
                <CardContent className="flex items-center justify-center gap-2 p-2">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>

                  <span className="flex flex-col">
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <p className="overflow-hidden text-ellipsis text-nowrap text-xs">
                      {booking.barbershop.address}
                    </p>
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>

          <Badge
            variant={bookingConfirmed ? "secondary" : "default"}
            className="w-fit"
          >
            {bookingConfirmed ? "Finalizado" : "Confirmado"}
          </Badge>

          <Card>
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Data</h3>
                <h4 className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Horário</h3>
                <h4 className="text-sm">{format(booking.date, "hh:mm")}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Barbearia</h3>
                <h4 className="text-sm">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
        </section>

        <SheetFooter className="mt-6 flex-row gap-2 px-5">
          <SheetClose className="w-full">
            <Button variant="secondary" className="w-full">
              Voltar
            </Button>
          </SheetClose>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button
                disabled={bookingConfirmed || isBookingDeleteLoading}
                variant="destructive"
                className="w-full"
              >
                {isBookingDeleteLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Cancelar reserva
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="w-[90%]">
              <AlertDialogHeader>
                <AlertDialogTitle>Cancelar Reserva</AlertDialogTitle>

                <AlertDialogDescription>
                  Tem certeza que deseja cancelar esse agendamento?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter className="flex-row gap-3">
                <AlertDialogCancel className="mt-0 w-full">
                  Voltar
                </AlertDialogCancel>

                <AlertDialogAction
                  className="w-full"
                  onClick={handleCancelClick}
                  disabled={isBookingDeleteLoading}
                >
                  {isBookingDeleteLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}{" "}
                  Confirmar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
