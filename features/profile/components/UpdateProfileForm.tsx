"use client";

import { ReactNode } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import SubmitButton from "../../../components/ui/SubmitButton";
import { updateGuestAction } from "../actions";
import { Guest } from "@/app/(account)/account/profile/page";

type UpdateProfileFormProps = {
  children: ReactNode;
  guest: Guest;
};

export default function UpdateProfileForm({
  children,
  guest,
}: UpdateProfileFormProps) {
  const { name, email, nationalID, countryFlag } = guest;

  async function updateGuest(formData: FormData) {
    try {
      const res = await updateGuestAction(formData);

      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again");
    }
  }

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-8 px-6 md:px-8 lg:px-10 xl:px-12 text-lg flex gap-5 sm:gap-6 flex-col"
    >
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-base md:text-lg">
          Full name
        </label>
        <input
          disabled
          id="fullName"
          name="fullName"
          defaultValue={name}
          className="px-3 md:px-4 lg:px-5 py-2 sm:py-3 text-base md:text-lg bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-base md:text-lg">
          Email address
        </label>
        <input
          disabled
          id="email"
          name="email"
          defaultValue={email}
          className="px-3 md:px-4 lg:px-5 py-2 sm:py-3 text-base md:text-lg bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-0.5 md:space-y-1 lg:space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality" className="text-base md:text-lg">
            Where are you from?
          </label>
          {countryFlag && (
            <div className="relative h-4 sm:h-5">
              <Image
                src={countryFlag}
                alt="Country flag"
                fill
                className="object-cover rounded-sm"
              />
            </div>
          )}
        </div>

        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID" className="text-base md:text-lg">
          National ID number
        </label>
        <input
          id="nationalID"
          name="nationalID"
          defaultValue={nationalID ?? ""}
          className="px-3 md:px-4 lg:px-5 py-2 sm:py-3 text-base md:text-lg bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6 mt-2 sm:mt-1 md:mt-0">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}
