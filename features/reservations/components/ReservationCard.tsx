import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  differenceInDays,
  format,
  formatDistance,
  isBefore,
  isToday,
  parseISO,
  startOfDay,
  startOfToday,
} from "date-fns";
import Image from "next/image";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";
import { Reservation } from "@/features/profile/components/UserReservation";

type ReservationCardProps = {
  reservation: Reservation & { created_at: string };
};

export const formatDistanceFromNow = (dateStr: string | Date) => {
  const dateString = dateStr instanceof Date ? dateStr.toISOString() : dateStr;
  return formatDistance(parseISO(dateString), new Date(), {
    addSuffix: true,
  }).replace("about ", "");
};

function ReservationCard({ reservation }: ReservationCardProps) {
  const {
    _id,
    startDate,
    endDate,
    numGuests,
    created_at,
    cabinId: { cabinName, cabinImage, price },
  } = reservation;

  const numNights = differenceInDays(
    new Date(reservation.endDate),
    new Date(reservation.startDate),
  );
  const totalPrice = price * numNights;

  return (
    <div className="flex flex-col md:flex-row border border-primary-800">
      <div className="relative h-32 aspect-square">
        <Image
          fill
          src={cabinImage}
          alt={`Cabin ${cabinName}`}
          className="object-cover md:border-r border-primary-800"
        />
      </div>

      <div className="grow px-3 sm:px-4 md:px-5 lg:px-6 py-3 flex flex-col gap-1 md:gap-0">
        <div className="flex items-start md:items-center justify-between mb-0.5 lg:mb-0">
          <h3 className="text-[17px] md:text-xl font-semibold">
            {numNights} night{numNights > 1 && "s"} in Cabin {cabinName}
          </h3>
          {isBefore(startOfDay(new Date(startDate)), startOfToday()) ? (
            <span className="bg-yellow-800 text-yellow-200 h-5 md:h-7 px-1.5 md:px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-5 md:h-7 px-1.5 md:px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-[15px] md:text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="grid grid-cols-2 md:flex gap-2 sm:gap-3 md:gap-4 lg:gap-5 mt-4 md:mt-auto items-baseline">
          <div className="col-span-2 flex gap-3 sm:gap-4 md:gap-5 items-center">
            <p className="text-xl font-semibold text-accent-400">
              ${totalPrice}
            </p>
            <p className="text-primary-300">&bull;</p>
            <p className="text-lg text-primary-300">
              {numGuests} guest{numGuests > 1 && "s"}
            </p>
          </div>
          <p className="col-span-2 md:ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-row md:flex-col md:border-l border-primary-800 w-full md:w-[100px]">
        {!isBefore(startOfDay(new Date(startDate)), startOfToday()) && (
          <>
            <Link
              href={`/account/reservations/edit/${_id.toString()}`}
              className="group flex items-center gap-1.5 sm:gap-2 uppercase text-xs font-bold text-primary-300 border-r border-t md:border-r-0 md:border-t-0 md:border-b border-primary-800 grow p-3 md:py-0 md:px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="size-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={_id.toString()} />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
