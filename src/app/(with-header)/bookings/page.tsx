import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookingItem from "@/components/booking-item";
import HighlightedSubtitle from "@/components/highlighted-subtitle";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <main className="min-h-[calc(100vh-146px-1.25rem)] space-y-6 px-5 py-6">
      <h1 className="text-xl font-bold">Agendamentos</h1>
      {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
        <h2 className="text-base">Você não possui agendamentos</h2>
      )}

      <section className="space-y-3">
        {confirmedBookings.length > 0 && (
          <HighlightedSubtitle>Confirmados</HighlightedSubtitle>
        )}

        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>

      <section className="space-y-3">
        {finishedBookings.length > 0 && (
          <HighlightedSubtitle>Finalizados</HighlightedSubtitle>
        )}

        {finishedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
    </main>
  );
}
