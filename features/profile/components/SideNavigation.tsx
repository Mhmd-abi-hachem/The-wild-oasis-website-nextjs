"use client";

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignoutButton from "./SignoutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="size-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="size-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="size-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="xl:border-r border-primary-900 h-full">
      <ul className="flex flex-row xl:flex-col justify-end gap-2 h-full w-full text-lg py-3 xl:py-12 px-6 md:px-8">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-2 sm:py-3 px-3 sm:px-4 md:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 lg:gap-3 font-semibold text-primary-200 ${
                pathname === link.href && "bg-primary-900"
              }`}
              href={link.href}
            >
              {link.icon}
              <span className="hidden lg:inline lg:mt-1">{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="xl:mt-auto">
          <SignoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
