import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  className?: string;
  size?: string;
  children: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const commonClasses =
    "bg-accent-500 px-6 py-4 sm:px-8 text-primary-800 text-base md:text-lg font-semibold hover:bg-accent-600 transition-colors cursor-pointer";

  // link button
  if (href) {
    return (
      <Link href={href} className={`${commonClasses} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${commonClasses} ${className}`} {...props}>
      {children}
    </button>
  );
}
