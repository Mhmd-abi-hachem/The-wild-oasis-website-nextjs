import SelectCountry from "@/features/profile/components/SelectCountry";
import UpdateProfileForm from "@/features/profile/components/UpdateProfileForm";
import auth from "@/lib/auth";
import Guest from "@/models/guestModel";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

export type Guest = {
  name: string;
  email: string;
  nationality?: string;
  nationalID?: string;
  countryFlag?: string;
};

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const guest = (await Guest.findById(session.user.id).lean()) as Guest | null;

  if (!guest) notFound();

  return (
    <div className="px-6 md:px-8 py-4 md:py-8 xl:py-12 space-y-8">
      <h2 className="font-semibold text-2xl text-accent-400 mb-3 sm:mb-4">
        Update your guest profile
      </h2>

      <p className="text-base md:text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-2 sm:px-3 py-2.5 md:py-3 text-base md:text-lg bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
