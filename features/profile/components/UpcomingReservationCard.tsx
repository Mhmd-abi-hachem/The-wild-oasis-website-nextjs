import Button from "@/components/ui/Button";
import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";
import { format, isToday } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Reservation } from "./UserReservation";

type UpcomingReservationCardProps = {
  reservation: Reservation;
};

export default function UpcomingReservationCard({
  reservation,
}: UpcomingReservationCardProps) {
  const {
    _id,
    startDate,
    endDate,
    numGuests,
    cabinId: { cabinName, cabinImage },
  } = reservation;

  return (
    <div className="relative overflow-hidden border border-primary-800 shadow-sm flex flex-col md:grid md:grid-cols-[45%_55%] h-auto">
      <div className="relative h-64 w-full md:h-full shrink-0 aspect-square">
        <Image
          src={cabinImage}
          alt={`Cabin ${cabinName}`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="flex flex-1 flex-col p-6 md:px-7 md:py-4 justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold text-primary-50 tracking-tight">
                {cabinName}
              </h3>
              <span className="text-xs font-bold tracking-widest uppercase opacity-90">
                Your next stay
              </span>
            </div>
            <span className="bg-green-800 text-green-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
              Confirmed
            </span>
          </div>
          <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-gray-300 mt-2">
            <div className="col-span-2 flex items-center gap-2">
              <CalendarIcon className="size-5 text-accent-400" />
              <span className="text-base font-light mt-0.5 sm:mt-1 tracking-tight md:tracking-normal">
                {format(new Date(startDate), "EEE, MMM dd yyyy")}
                {isToday(new Date(startDate)) && "(Today)"} &mdash;{" "}
                {format(new Date(endDate), "EEE, MMM dd yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPinIcon className="size-5 text-accent-400" />
              <span className="text-sm font-light truncate mt-0.5 sm:mt-1">
                Dolomites (Italy)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <UsersIcon className="size-5 text-accent-400" />
              <span className="text-sm font-light mt-0.5 sm:mt-1">
                {numGuests} {numGuests === 1 ? "guest" : "guests"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5 mt-6 pt-4 border-t border-white/5">
          <Button
            href="/reservation"
            className="px-4! py-2.5! md:px-6! md:py-4!"
          >
            View Reservation
          </Button>
          <Link
            className="text-accent-500 hover:text-accent-600 text-sm font-semibold border-b border-primary-100/30 hover:border-accent-600 transition-colors pb-0.5"
            href={`/account/reservations/edit/${_id}`}
          >
            Modify
          </Link>
        </div>
      </div>
    </div>
  );
}
