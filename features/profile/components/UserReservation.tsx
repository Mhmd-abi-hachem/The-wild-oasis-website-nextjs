import auth from "@/lib/auth";
import "@/models/cabinModel";
import Booking from "@/models/reservationModel";
import { headers } from "next/headers";
import NoReservationMessage from "./NoReservationMessage";
import UpcomingReservationCard from "./UpcomingReservationCard";

export type Reservation = {
  _id: string;
  startDate: string;
  endDate: string;
  numGuests: number;
  cabinId: {
    cabinName: string;
    cabinImage: string;
    price: number;
  };
};

export default async function UserReservation() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const upcomingReservation = (await Booking.findOne({
    guestId: session?.user.id,
  })
    .select("startDate endDate cabinId numGuests")
    .populate("cabinId", "cabinName cabinImage")
    .lean()) as Reservation | null;

  return upcomingReservation ? (
    <UpcomingReservationCard reservation={upcomingReservation} />
  ) : (
    <NoReservationMessage />
  );
}
