import { HomeIcon } from "@heroicons/react/24/solid";
import Button from "@/components/ui/Button";

export default function NoReservationMessage() {
  return (
    <div className="relative overflow-hidden bg-primary-900 border border-primary-800 shadow-sm flex flex-col items-center justify-center text-center h-auto">
      <div className="absolute inset-0 bg-cover bg-center h-full w-full opacity-50 bg-accent-800/80">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4 p-6 max-w-md">
        <div className="p-2 md:p-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          <HomeIcon className="size-6 md:size-8 text-accent-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-medium text-accent-300 tracking-tight">
            You have no upcoming reservations
          </h3>
          <p className="text-primary-200 font-light text-base md:text-lg">
            Explore our luxury cabins and book your next escape.
          </p>
        </div>
        <Button href="/cabins" className="mt-1">
          Explore Cabins
        </Button>
      </div>
    </div>
  );
}
