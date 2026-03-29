import Link from "next/link";
import { ReactNode } from "react";

type PaginationButtonProps = {
  href?: string;
  disabled?: boolean;
  children: ReactNode;
};

export default function PaginationButton({
  href,
  disabled,
  children,
}: PaginationButtonProps) {
  if (disabled)
    return (
      <span
        aria-disabled="true"
        className="opacity-40 cursor-not-allowed relative inline-flex items-center gap-2 rounded-md px-4 py-2 text-base text-slate-300 ring-1 ring-inset ring-slate-700/80"
      >
        {children}
      </span>
    );

  return (
    <Link
      href={href!}
      className="relative inline-flex items-center gap-2 rounded-md px-4 py-2 text-base text-slate-300 ring-1 ring-inset ring-slate-700/80 hover:bg-slate-800/60 hover:text-slate-100 focus:outline-none transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
