import {
  ArrowRightIcon,
  IdentificationIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { Profile } from "./ProfileProgress";

type ProfileProgressCardProps = {
  profile: Profile;
};

export default function ProfileProgressCard({
  profile,
}: ProfileProgressCardProps) {
  let progress = 100;
  if (profile.nationality === "") progress -= 10;
  if (profile.nationalID === "") progress -= 10;

  return (
    <div className="border border-primary-800 p-6 overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          {progress === 100 ? (
            <>
              <CheckCircleIcon className="size-5 text-accent-500" />{" "}
              <span className="mt-1 text-base md:text-lg">
                Profile Complete{" "}
              </span>
            </>
          ) : (
            <span className="mt-1 text-base md:text-lg">
              Complete your profile
            </span>
          )}
        </h3>

        <span className="font-bold text-lg text-accent-500">{progress}%</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-accent-300 text-sm md:text-base">
          profile {progress}% complete
        </span>
        <div className="relative mb-6 h-1 w-full bg-gray-700">
          <div
            className="absolute left-0 top-0 h-full bg-accent-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {progress !== 100 ? (
        <Link
          className="flex items-center gap-2 sm:gap-3 p-3 border border-white/10 hover:border-primary-50/30 transition-colors group"
          href="/account/profile"
        >
          <IdentificationIcon className="size-4 text-primary-300" />
          <div className="flex-1">
            <p className="text-sm text-primary-200 mt-0.5 sm:mt-1 whitespace-nowrap">
              Add your{" "}
              {profile.nationalID === "" && profile.nationality === ""
                ? "ID & Nationality"
                : profile.nationalID === ""
                  ? "national ID"
                  : profile.nationality === "" && "nationality"}
            </p>
          </div>
          <ArrowRightIcon className="size-4 text-primary-200 transition-transform group-hover:translate-x-0.5 ease-in-out" />
        </Link>
      ) : (
        <Link
          href="/account/profile"
          className="flex items-center gap-1.5 py-1 text-accent-500 hover:text-accent-600 transition-colors group"
        >
          View your profile{" "}
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 ease-in-out" />
        </Link>
      )}
    </div>
  );
}
