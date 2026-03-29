import {
  DocumentTextIcon,
  InformationCircleIcon,
  WifiIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

const HELP_LINKS = [
  {
    label: "Cabin Rules",
    icon: <DocumentTextIcon className="size-4" />,
  },
  {
    label: "Wifi Password",
    icon: <WifiIcon className="size-4" />,
  },
  {
    label: "Cancellation Policy",
    icon: <InformationCircleIcon className="size-4" />,
  },
];

export default function HelpCard() {
  return (
    <div className="border border-primary-800 p-6 lg:mt-10">
      <h3 className="mb-3 sm:mb-4 text-lg font-medium">Need help?</h3>
      <div className="flex flex-col gap-1">
        {HELP_LINKS.map((link) => (
          <Link
            key={link.label}
            className="group flex items-center justify-between px-2 py-3 text-sm text-primary-300 hover:text-primary-100 transition-colors border-b border-white/5 last:border-0"
            href="#"
          >
            <span className="flex items-center gap-2.5 sm:gap-3">
              {link.icon}
              <span className="mt-1">{link.label}</span>
            </span>
          </Link>
        ))}
      </div>
      <a
        className="mt-4 sm:mt-5 md:mt-6 flex w-full items-center justify-center gap-2 bg-accent-500 px-4! py-2.5! md:px-6! md:py-4! tracking-wider text-primary-800 text-base lg:text-lg font-semibold hover:bg-accent-600 transition-colors"
        href="mailto:mohamadhachem908@gmail.com"
      >
        Contact Support
      </a>
    </div>
  );
}
