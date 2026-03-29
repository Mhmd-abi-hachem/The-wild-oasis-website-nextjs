"use server";

import auth from "@/lib/auth";
import Booking from "@/models/reservationModel";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type BookingData = {
  cabinId: string;
  price: number;
  startDate: Date;
  endDate: Date;
};

export async function createReservationAction(
  bookingData: BookingData,
  formData: FormData,
) {
  const numGuests = Number((formData.get("numGuests") as string) || 1);
  const observations = ((formData.get("observations") as string) || "").slice(
    0,
    1000,
  );

  // Authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { status: "error", message: "You must be logged in" };

  // validation
  if (!bookingData.startDate || !bookingData.endDate) {
    return { status: "error", message: "Start and end dates are required" };
  }

  const newBooking = {
    ...bookingData,
    guestId: session.user.id,
    numGuests,
    observations,
    extrasPrice: 0,
    totalPrice: bookingData.price,
    status: "unconfirmed",
    isPaid: false,
    hasBreakFast: false,
  };

  try {
    const createBooking = await Booking.create(newBooking);
    if (!createBooking)
      return {
        status: "error",
        message: "Couldn't reserve cabin. Please try again",
      };

    revalidatePath(`/cabins/${bookingData.cabinId}`);

    return { status: "success", message: "Reservation created successfully" };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Something went wrong. Please try again",
    };
  }
}
