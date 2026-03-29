import Booking from "@/models/reservationModel";
import ImportantReminders from "./ImportantReminders";
import ReadyToStartCard from "./ReadyToStartCard";
import { headers } from "next/headers";
import auth from "@/lib/auth";

export default async function ReservationInfoCard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const upcomingReservation = await Booking.findOne({
    guestId: session?.user.id,
  })
    .select("_id")
    .lean();

  return upcomingReservation ? (
    <div>
      <h2 className="text-xl font-medium mb-3 sm:mb-4">Important Reminders</h2>
      <ImportantReminders />
    </div>
  ) : (
    <div>
      <h2 className="text-xl font-medium mb-3 sm:mb-4">
        Ready to start your journey?
      </h2>
      <ReadyToStartCard />
    </div>
  );
}
