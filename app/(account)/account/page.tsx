import Spinner from "@/components/ui/Spinner";
import SpinnerMini from "@/components/ui/SpinnerMini";
import HelpCard from "@/features/profile/components/HelpCard";
import ProfileProgress from "@/features/profile/components/ProfileProgress";
import ReservationInfoCard from "@/features/profile/components/ReservationInfoCard";
import UserReservation from "@/features/profile/components/UserReservation";
import auth from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const firstName = session.user.name.split(" ").at(0);

  return (
    <div className="px-6 py-4 md:px-8 md:py-8 xl:py-12 space-y-8">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-3xl text-accent-400">
          Welcome, {firstName}
        </h2>
        <p className="text-base md:text-lg text-primary-200">
          Here&apos;s your account overview and upcoming adventures.
        </p>
      </div>
      <h2 className="text-xl font-medium text-accent-400 mb-3 sm:mb-4">
        Upcoming Reservation
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <Suspense fallback={<Spinner />}>
          <UserReservation />
        </Suspense>

        <Suspense fallback={<SpinnerMini />}>
          <ProfileProgress />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <ReservationInfoCard />
        </Suspense>

        <HelpCard />
      </div>
    </div>
  );
}
