import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-4 sm:space-y-5 md:space-y-6 mt:3 sm:mt-4">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Thank you for your reservation!
      </h1>
      <Link
        href="/account/reservations"
        className="underline text-lg md:text-xl text-accent-500 hover:text-accent-600 transition-colors inline-block cursor-pointer"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
