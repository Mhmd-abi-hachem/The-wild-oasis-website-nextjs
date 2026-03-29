"use client";

import toast from "react-hot-toast";
import { updateReservationAction } from "../actions";
import SubmitButton from "@/components/ui/SubmitButton";
import { useRouter } from "next/navigation";

type EditReservationFormProps = {
  booking: {
    _id: string;
    numGuests: number;
    observations?: string;
    cabinId: {
      maxCapacity: number;
    };
  };
};

export default function EditReservationForm({
  booking,
}: EditReservationFormProps) {
  const router = useRouter();

  async function updateReservation(formData: FormData) {
    try {
      const res = await updateReservationAction(formData);

      if (res.status === "success") {
        toast.success(res.message);
        router.push("/account/reservations");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again");
    }
  }

  return (
    <form
      action={updateReservation}
      className="bg-primary-900 py-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-lg flex gap-6 flex-col"
    >
      <div className="space-y-1 md:space-y-2">
        <label htmlFor="numGuests" className="block">
          How many guests?
        </label>
        <select
          name="numGuests"
          id="numGuests"
          defaultValue={booking.numGuests}
          className="px-2 sm:px-3 py-2.5 md:py-3 bg-primary-200 text-primary-800 text-base sm:text-lg w-full shadow-sm rounded-sm"
          required
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from(
            { length: booking.cabinId.maxCapacity },
            (_, i) => i + 1,
          ).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
      </div>

      <input type="hidden" name="bookingId" value={booking._id} />

      <div className="space-y-1 md:space-y-2">
        <label htmlFor="observations" className="block">
          Anything we should know about your stay?
        </label>
        <textarea
          id="observations"
          name="observations"
          defaultValue={booking.observations}
          className="p-3 bg-primary-200 text-primary-800 text-base sm:text-lg w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <SubmitButton pendingLabel="Updating...">
          Update reservation
        </SubmitButton>
      </div>
    </form>
  );
}
