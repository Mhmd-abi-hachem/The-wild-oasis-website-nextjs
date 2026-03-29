import ReservationCard from "@/features/reservations/components/ReservationCard";
import auth from "@/lib/auth";
import "@/models/cabinModel";
import Booking from "@/models/reservationModel";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const bookings = await Booking.find({ guestId: session.user.id }).populate(
    "cabinId",
    "cabinName cabinImage price",
  );

  return (
    <div className="px-6 md:px-8 py-4 md:py-8 xl:py-12 space-y-8">
      <h2 className="font-semibold text-2xl text-accent-400 mb-2 sm:mb-3">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link
            className="underline text-accent-500 hover:text-accent-600 transition-colors"
            href="/cabins"
          >
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ul className="space-y-12 md:space-y-10 lg:space-y-8 xl:space-y-6">
          {bookings.map((booking) => (
            <ReservationCard reservation={booking} key={booking.id} />
          ))}
        </ul>
      )}
    </div>
  );
}
