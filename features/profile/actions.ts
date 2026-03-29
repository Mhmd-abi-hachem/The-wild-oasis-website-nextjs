"use server";

import auth from "@/lib/auth";
import Guest from "@/models/guestModel";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function updateGuestAction(formData: FormData) {
  const nationalID = formData.get("nationalID") as string;
  const [nationality, countryFlag] = (
    formData.get("nationality") as string
  ).split("%");

  // authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return { status: "error", message: "You must be logged in" };

  // validation
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    return { status: "error", message: "Please provide a valid national ID" };

  const updateData = { nationality, nationalID, countryFlag };

  const updatedGuest = await Guest.findOneAndUpdate(
    { email: session.user.email },
    updateData,
    {
      new: true,
      runValidators: true,
    },
  );

  revalidatePath("/account/profile");

  return { status: "success", message: "Profile updated successfully" };
}
