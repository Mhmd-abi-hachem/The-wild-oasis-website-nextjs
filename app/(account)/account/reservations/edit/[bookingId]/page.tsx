import EditReservationForm from "@/features/reservations/components/EditReservationForm";
import "@/models/cabinModel";
import Booking from "@/models/reservationModel";

export default async function Page({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;

  const booking = JSON.parse(
    JSON.stringify(
      await Booking.findById(bookingId)
        .populate("cabinId", "maxCapacity")
        .lean(),
    ),
  );

  return (
    <div className="px-6 md:px-8 py-4 lg:py-5 xl:py-12 space-y-8">
      <h2 className="font-semibold text-xl sm:text-2xl text-accent-400 mb-4 md:mb-6 xl:mb-7">
        Edit Your Reservation
      </h2>

      <EditReservationForm booking={booking} />
    </div>
  );
}
