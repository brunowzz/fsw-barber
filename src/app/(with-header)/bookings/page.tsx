import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import BookingItem from "@/components/booking-item";
import HighlightedSubtitle from "@/components/highlighted-subtitle";
import { db } from "@/lib/prisma";
import { isFuture, isPast } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) return redirect("/");

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking) =>
    isFuture(booking.date),
  );
  const finishedBookings = bookings.filter((booking) => isPast(booking.date));
  return (
    <main className="min-h-[calc(100vh-146px-1.25rem)] space-y-6 px-5 py-6">
      <h1 className="text-xl font-bold">Agendamentos</h1>

      <section className="space-y-3">
        <HighlightedSubtitle>Confirmados</HighlightedSubtitle>

        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>

      <section className="space-y-3">
        <HighlightedSubtitle>Finalizados</HighlightedSubtitle>

        {finishedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </section>
    </main>
  );
}
