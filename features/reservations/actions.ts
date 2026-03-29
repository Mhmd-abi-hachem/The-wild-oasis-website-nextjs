"use server";

import auth from "@/lib/auth";
import Booking from "@/models/reservationModel";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function deleteReservation(bookingId: string) {
  // authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { status: "error", message: "You must be logged in" };

  // authorization
  const guestBookings = await Booking.find({ guestId: session.user.id });
  const guestBookingIds = guestBookings.map((booking) =>
    booking._id.toString(),
  );

  if (!guestBookingIds.includes(bookingId))
    return {
      status: "error",
      message: "You are not allowed to delete this Reservation",
    };

  const deleteBooking = await Booking.findByIdAndDelete(bookingId);

  if (!deleteBooking)
    return {
      status: "error",
      message: "Reservation could not be deleted",
    };

  revalidatePath("/account/reservations");

  return {
    status: "success",
    message: "Reservation deleted successfully",
  };
}

export async function updateReservationAction(formData: FormData) {
  const bookingId = formData.get("bookingId");
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

  // Authorization
  const guestBookings = await Booking.find({ guestId: session.user.id });
  const guestBookingIds = guestBookings.map((booking) =>
    booking._id.toString(),
  );

  if (!guestBookingIds.includes(bookingId))
    return {
      status: "error",
      message: "You are not allowed to delete this booking.",
    };

  // Update data
  const editReservation = await Booking.findByIdAndUpdate(bookingId, {
    numGuests,
    observations,
  });

  if (!editReservation)
    return {
      status: "error",
      message: "Couldn't update booking. Please Try again",
    };

  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  return { status: "success", message: "Reservation updated successfully" };
}
