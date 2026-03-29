import Image from "next/image";
import Link from "next/link";

import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 md:gap-4 z-10">
      <Image
        src={logo}
        height="60"
        width="60"
        quality={100}
        alt="The Wild Oasis logo"
        className="h-10 w-10 sm:h-12 sm:w-12 md:h-[60px] md:w-[60px]"
      />
      <span className="hidden sm:inline text-lg md:text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
