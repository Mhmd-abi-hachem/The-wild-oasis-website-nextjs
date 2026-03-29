import Link from "next/link";

import NavigationAuth from "./NavigationAuth";

export default async function Navigation() {
  return (
    <nav className="z-10 text-base sm:text-lg md:text-xl">
      <ul className="flex gap-4 sm:gap-8 md:gap-12 lg:gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <NavigationAuth />
        </li>
      </ul>
    </nav>
  );
}
