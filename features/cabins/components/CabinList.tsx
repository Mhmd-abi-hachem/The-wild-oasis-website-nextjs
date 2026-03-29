import Pagination from "@/components/ui/Pagination";
import Cabin from "@/models/cabinModel";
import CabinCard from "./CabinCard";

export type Cabin = {
  _id: string;
  cabinName: string;
  maxCapacity: number;
  price: number;
  discount?: number;
  description?: string;
  cabinImage?: string;
};

type CabinListProps = {
  filter: "small" | "medium" | "large" | "all";
  page: number;
};

const ITEMS_PER_PAGE = 4;

export default async function CabinList({ filter, page }: CabinListProps) {
  const cabinsFilter =
    filter === "small"
      ? { maxCapacity: { $lte: 3 } }
      : filter === "medium"
        ? { maxCapacity: { $gte: 4, $lte: 7 } }
        : filter === "large"
          ? { maxCapacity: { $gte: 8 } }
          : {};

  // pagination
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const totalCabins = await Cabin.find({}).countDocuments();

  const totalPages = Math.ceil(totalCabins / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE + 1;
  let end = page * ITEMS_PER_PAGE;

  if (end > totalCabins) {
    end = totalCabins;
  }

  const cabins: Cabin[] = JSON.parse(
    JSON.stringify(
      await Cabin.find(cabinsFilter).skip(offset).limit(ITEMS_PER_PAGE).lean(),
    ),
  );

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {cabins.map((cabin) => (
          <CabinCard cabin={cabin} key={cabin._id} />
        ))}
      </div>

      <div className="w-full flex items-center justify-between border-t border-slate-700/60 pt-6 mt-12">
        <div className="hidden sm:block">
          <p className="text-base text-slate-400 whitespace-nowrap">
            Showing <span className="font-normal text-slate-200">{start}</span>{" "}
            to <span className="font-normal text-slate-200">{end}</span> of{" "}
            <span className="font-normal text-slate-200">{totalCabins}</span>{" "}
            results
          </p>
        </div>

        <Pagination totalPages={totalPages} page={page} />
      </div>
    </>
  );
}
