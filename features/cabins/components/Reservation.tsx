import auth from "@/lib/auth";
import { headers } from "next/headers";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import LoginMessage from "./LoginMessage";
import Setting from "@/models/settingModel";
import { getBookedDatesByCabinId } from "@/lib/data-service";
import { Cabin } from "./CabinList";

export type Settings = { minBookingLength: number; maxBookingLength: number };

type ReservationProps = {
  cabin: Cabin;
};

export default async function Reservation({ cabin }: ReservationProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const [settings, bookedDates] = await Promise.all([
    Setting.findOne()
      .select("minBookingLength maxBookingLength -_id")
      .lean<Settings>(),
    getBookedDatesByCabinId(cabin._id),
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 border border-primary-800 min-h-[400px] divide-y md:divide-y-0 md:divide-x">
      <DateSelector
        settings={settings!}
        cabin={cabin}
        bookedDates={bookedDates}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
