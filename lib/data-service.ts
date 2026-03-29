import Booking from "@/models/reservationModel";
import { eachDayOfInterval } from "date-fns";

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag",
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
}

export async function getBookedDatesByCabinId(cabinId: string) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  let bookings;

  try {
    bookings = await Booking.find({
      cabinId,
      $or: [{ startDate: { $gte: today } }, { status: "checked-in" }],
    }).lean();
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // converting to actual dates to be displayed in the date picker
  const bookedDates = bookings
    .map((booking) =>
      eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      }),
    )
    .flat();

  return bookedDates;
}
