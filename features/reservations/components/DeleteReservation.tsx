"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react";
import SpinnerMini from "../../../components/ui/SpinnerMini";
import { deleteReservation } from "../actions";
import toast from "react-hot-toast";

type DeleteReservationProps = {
  bookingId: string;
};

function DeleteReservation({ bookingId }: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteReservation(bookingId);

      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-1.5 sm:gap-2 uppercase text-xs font-bold text-primary-300 grow p-3 md:py-0 md:px-3 border-t border-primary-800 md:border-t-0 hover:bg-accent-600 transition-colors hover:text-primary-900 cursor-pointer"
    >
      {!isPending ? (
        <>
          <TrashIcon className="size-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
