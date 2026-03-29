"use client";

import { differenceInDays } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SubmitButton from "../../../components/ui/SubmitButton";
import { createReservationAction } from "../actions";
import { Cabin } from "./CabinList";
import { useReservation } from "./ReservationContext";

type ReservationFormProps = {
  cabin: Cabin;
  user: {
    email: string;
    name: string;
    image?: string | null;
  };
};

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const router = useRouter();
  const { range } = useReservation();

  const { _id, maxCapacity, price, discount } = cabin;

  const startDate = range.from;
  const endDate = range.to;

  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const cabinPrice = numNights * (price - (discount ?? 0));

  const bookingData = {
    cabinId: _id,
    price,
    startDate: startDate!,
    endDate: endDate!,
    numNights,
    cabinPrice,
  };

  async function createReservation(formData: FormData) {
    try {
      const res = await createReservationAction(bookingData, formData);

      if (res.status === "success") {
        router.push("/cabins/thank-you");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again");
    }
  }

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-1.5 sm:gap-2 md:gap-3 items-center whitespace-nowrap">
          <div className="relative size-6 sm:size-7 md:size-8">
            <Image
              referrerPolicy="no-referrer"
              fill
              className="object-cover rounded-full grayscale-10 opacity-90"
              src={user.image ?? "/default-user.webp"}
              alt={`${user.name} photo`}
            />
          </div>
          <p className="max-w-[105px] truncate mt-0.5 sm:max-w-none sm:overflow-visible sm:whitespace-normal">
            {user.name}
          </p>
        </div>
      </div>

      <form
        action={createReservation}
        className="bg-primary-900 py-6 sm:py-7 md:py-8 lg:py-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-lg flex flex-col gap-6 md:gap-7"
      >
        <div className="space-y-1 md:space-y-2">
          <label htmlFor="numGuests" className="block">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-2 sm:px-3 py-2.5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1 md:space-y-2">
          <label htmlFor="observations" className="block">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="p-3 bg-primary-200 text-primary-800 text-base w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}{" "}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
