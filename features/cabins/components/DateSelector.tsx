"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Cabin } from "./CabinList";
import { Settings } from "./Reservation";

type DateSelectorProps = {
  settings: Settings;
  cabin: Cabin;
  bookedDates: Date[];
};

function isAlreadyBooked(range: DateRange, datesArr: Date[]): boolean {
  return (
    !!range.from &&
    !!range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from!, end: range.to! }),
    )
  );
}

export default function DateSelector({
  settings,
  cabin,
  bookedDates,
}: DateSelectorProps) {
  const { range, setRange, resetRange } = useReservation();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const displayRange = isAlreadyBooked(range, bookedDates)
    ? { from: undefined, to: undefined }
    : range;

  const { price, discount } = cabin;
  const numNights =
    displayRange.from && displayRange.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * (price - (discount ?? 0));

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        classNames={{
          months:
            "flex flex-col xl:flex-row justify-center items-center gap-4 md:gap-6 pt-4 pb-4 md:pb-0 md:pt-12",
        }}
        mode="range"
        onSelect={(range) => {
          if (!range) return;
          setRange(range);
        }}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        hideNavigation
        captionLayout="dropdown"
        numberOfMonths={isDesktop ? 2 : 1}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date: Date) => isSameDay(date, curDate))
        }
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 px-4 md:px-8 py-4 bg-accent-500 text-primary-800">
        <div className="flex flex-wrap items-baseline gap-4">
          <p className="flex gap-2 items-baseline">
            {discount && discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">${price - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${price}</span>
            )}
            <span>/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-2 sm:px-3 py-1 sm:py-2 text-xl sm:text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-base sm:text-lg font-bold uppercase">
                  Total
                </span>{" "}
                <span className="text-xl sm:text-2xl font-semibold">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range.from && range.to ? (
          <div className="self-end md:self-auto">
            <button
              className="border border-primary-800 py-2 px-3 md:px-4 text-sm font-semibold w-full md:w-auto cursor-pointer"
              onClick={resetRange}
            >
              Clear
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
