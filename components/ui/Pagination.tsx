import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import PaginationButton from "./PaginationButton";

type PaginationProps = {
  totalPages: number;
  page: number;
};

export default function Pagination({ totalPages, page }: PaginationProps) {
  return (
    <nav className="w-full">
      <div className="flex flex-1 items-center justify-between sm:justify-end gap-x-3">
        {page === 1 ? (
          <PaginationButton disabled={true}>
            <ArrowLeftIcon className="size-4" />
            Previous
          </PaginationButton>
        ) : (
          <PaginationButton href={`/cabins?page=${page - 1}`}>
            <ArrowLeftIcon className="size-4" />
            Previous
          </PaginationButton>
        )}

        <div className="hidden sm:flex items-center gap-x-1 mx-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <Link
              key={idx}
              href={`/cabins?page=${idx + 1}`}
              className={`inline-flex items-center justify-center rounded-md size-9 text-base
                  ${page === idx + 1 ? "text-slate-100 bg-[#26364a] ring-1 ring-inset ring-[#26364a] focus:outline-none" : "text-slate-400 hover:bg-slate-800/60 hover:text-[#d1a877] focus:outline-none transition-colors duration-200"}`}
            >
              {idx + 1}
            </Link>
          ))}
        </div>

        {totalPages !== page ? (
          <PaginationButton href={`/cabins?page=${page + 1}`}>
            Next
            <ArrowRightIcon className="size-4" />
          </PaginationButton>
        ) : (
          <PaginationButton disabled={true}>
            Next
            <ArrowRightIcon className="size-4" />
          </PaginationButton>
        )}
      </div>
    </nav>
  );
}
