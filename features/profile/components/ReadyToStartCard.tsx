import { SparklesIcon, SunIcon } from "@heroicons/react/20/solid";

export default function ReadyToStartCard() {
  return (
    <div className="border border-primary-800 p-6">
      <div className="flex flex-col gap-4">
        <p className="text-primary-200 font-light text-sm leading-relaxed">
          Our cabins are located in the heart of nature. Browse our collection
          to find the perfect spot for your retreat. Whether you prefer a
          lakeside view or a deep forest hideaway, we have something for
          everyone.
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/5">
            <SunIcon className="size-4 text-accent-500" />
          </span>
          <span className="text-sm text-primary-400">
            Best season to visit is now
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/5">
            <SparklesIcon className="size-4 text-accent-500" />
          </span>
          <span className="text-sm text-primary-400">
            Curated experiences tailored for you
          </span>
        </div>
      </div>
    </div>
  );
}
