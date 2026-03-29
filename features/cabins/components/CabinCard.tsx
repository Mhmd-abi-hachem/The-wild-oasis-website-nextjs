import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { Cabin } from "./CabinList";

type CabinCardProps = {
  cabin: Cabin;
};

export default function CabinCard({ cabin }: CabinCardProps) {
  const { _id, cabinName, maxCapacity, price, discount, cabinImage } = cabin;

  return (
    <div className="flex flex-col sm:flex-row border-primary-800 border">
      <div className="sm:flex-1 relative h-64 sm:h-auto">
        <Image
          src={cabinImage || `/cabins/cabin-${cabinName}.jpg`}
          alt={`Cabin ${cabinName}`}
          fill
          unoptimized
          className="object-cover sm:border-r border-b sm:border-b-0 border-primary-800"
        />
      </div>

      <div className="grow sm:flex-1">
        <div className="pt-4 pb-3 px-4 sm:pt-5 sm:pb-4 sm:px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-2 sm:mb-3">
            Cabin {cabinName}
          </h3>

          <div className="flex gap-2 sm:gap-3 items-center mb-3 sm:mb-2">
            <UsersIcon className="size-4 sm:size-5 text-primary-600" />
            <p className="text-base sm:text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex gap-2 sm:gap-3 justify-end items-baseline">
            {discount && discount > 0 ? (
              <>
                <span className="text-2xl sm:text-3xl font-[350]">
                  ${price - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${price}
                </span>
              </>
            ) : (
              <span className="text-2xl sm:text-3xl font-[350]">${price}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>

        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <Link
            href={`/cabins/${_id}`}
            className="border-l border-primary-800 py-3 px-4 sm:py-4 sm:px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
