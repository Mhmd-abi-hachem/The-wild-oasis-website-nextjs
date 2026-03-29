"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";

const filters = [
  {
    capacity: "all",
    label: "All cabins",
  },
  {
    capacity: "small",
    label: (
      <span>
        2&mdash;3 <span className="hidden sm:inline">guests</span>
      </span>
    ),
  },
  {
    capacity: "medium",
    label: (
      <span>
        4&mdash;7 <span className="hidden sm:inline">guests</span>
      </span>
    ),
  },
  {
    capacity: "large",
    label: (
      <span>
        8&mdash;12 <span className="hidden sm:inline">guests</span>
      </span>
    ),
  },
];

export default function CabinsFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex flex-wrap">
      {filters.map((filter) => (
        <FilterButton
          key={filter.capacity}
          filter={filter.capacity}
          handleFilter={handleFilter}
          activeFilter={activeFilter}
        >
          {filter.label}
        </FilterButton>
      ))}
    </div>
  );
}
