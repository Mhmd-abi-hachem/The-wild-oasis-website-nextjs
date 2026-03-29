import auth from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function NavigationAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const firstName = session?.user.name.split(" ").at(0);

  return session?.user ? (
    <Link
      href="/account"
      className="hover:text-accent-400 transition-colors flex items-center gap-1.5 sm:gap-2 md:gap-3"
    >
      <div className="relative size-6 sm:size-7 md:size-8">
        <Image
          className="object-cover rounded-full grayscale-10 opacity-90"
          fill
          src={session.user.image ?? "/default-user.webp"}
          alt={`${session.user.name} photo`}
          referrerPolicy="no-referrer"
        />
      </div>

      <span>{firstName}</span>
    </Link>
  ) : (
    <Link href="/account" className="hover:text-accent-400 transition-colors">
      Guest area
    </Link>
  );
}
