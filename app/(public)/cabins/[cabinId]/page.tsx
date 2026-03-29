import Spinner from "@/components/ui/Spinner";
import Reservation from "@/features/cabins/components/Reservation";
import TextExpander from "@/features/cabins/components/TextExpander";
import Cabin from "@/models/cabinModel";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import mongoose from "mongoose";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type CabinPageProps = {
  params: Promise<{
    cabinId: string;
  }>;
};

export async function generateMetadata({ params }: CabinPageProps) {
  const { cabinId } = await params;

  const cabin = await Cabin.findById(cabinId).select("cabinName -_id");
  if (!cabin) return { title: "Cabin Not Found" };

  return { title: `Cabin ${cabin.cabinName}` };
}

export async function generateStaticParams() {
  const cabins = await Cabin.find({}).select("_id");

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin._id),
  }));

  return ids;
}

export default async function Page({ params }: CabinPageProps) {
  const { cabinId } = await params;

  if (!mongoose.Types.ObjectId.isValid(cabinId)) {
    notFound();
  }

  const cabin = JSON.parse(
    JSON.stringify(await Cabin.findById(cabinId).lean()),
  );
  if (!cabin) notFound();

  const { cabinName, maxCapacity, cabinImage, description } = cabin;

  return (
    <div className="w-full xl:max-w-6xl mx-auto mt-2 sm:mt-3 md:mt-4 lg:mt-6 xl:mt-8">
      <div className="flex flex-col xl:grid xl:grid-cols-[3fr_4fr] gap-5 sm:gap-6 md:gap-7 lg:gap-10 xl:gap-20 border border-primary-800 xl:py-3 xl:px-10 mb-12 md:mb-18 lg:mb-24">
        <div className="w-full h-[360px] md:h-[400px] xl:h-[500px] relative xl:scale-[1.15] xl:-translate-x-3">
          <Image
            src={cabinImage}
            alt={`Cabin ${cabinName}`}
            fill
            className="object-cover border-b xl:border-b-0 border-primary-800"
          />
        </div>

        <div className="px-4 py-2 xl:p-0">
          <h3 className="text-accent-100 font-black text-4xl md:text-6xl xl:text-7xl mb-2 md:mb-3 lg:mb-4 xl:mb-5 xl:translate-x-[-254px] xl:bg-primary-950 xl:p-6 xl:pb-1 xl:w-[150%]">
            Cabin {cabinName}
          </h3>

          <p className="text-lg text-primary-300 mb-8 sm:mb-9 md:mb-10">
            <TextExpander>{description}</TextExpander>
          </p>

          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-2 sm:gap-3 items-center">
              <UsersIcon className="size-5 text-primary-600" />
              <span className="text-base md:text-lg mt-1">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-2 sm:gap-3 items-start md:items-center">
              <MapPinIcon className="size-5 text-primary-600" />
              <span className="text-base md:text-lg md:mt-1">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-2 sm:gap-3 items-center">
              <EyeSlashIcon className="size-5 text-primary-600" />
              <span className="text-base md:text-lg mt-1">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-3xl xl:text-5xl font-semibold text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 text-accent-400 tracking-tight">
          Reserve today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
