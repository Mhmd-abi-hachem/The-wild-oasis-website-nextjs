import CabinList from "@/features/cabins/components/CabinList";
import CabinsFilter from "@/features/cabins/components/CabinsFilter";
import Spinner from "@/components/ui/Spinner";
import { Suspense } from "react";
import ReservationReminder from "@/features/cabins/components/ReservationReminder";

export const metadata = {
  title: "Our Cabins",
};

type CabinsPageProps = {
  searchParams: Promise<{
    capacity?: "small" | "medium" | "large" | "all";
    page?: number;
  }>;
};

const DEFAULT_PAGE = 1;

export default async function Page({ searchParams }: CabinsPageProps) {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";
  const page = Number(params?.page ?? DEFAULT_PAGE);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl mb-2 md:mb-3 lg:mb-4 xl:mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-base md:text-lg mb-8 md:mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-6 sm:mb-7 md:mb-8">
        <CabinsFilter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} page={page} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
