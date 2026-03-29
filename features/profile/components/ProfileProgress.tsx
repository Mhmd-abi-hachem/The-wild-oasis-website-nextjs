import auth from "@/lib/auth";
import Guest from "@/models/guestModel";
import { headers } from "next/headers";
import ProfileProgressCard from "./ProfileProgressCard";

export type Profile = { nationality: string; nationalID: string };

export default async function ProfileProgress() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userProfile = (await Guest.findOne({ _id: session?.user.id })
    .select("nationality nationalID -_id")
    .lean()) as Profile | null;

  return <ProfileProgressCard profile={userProfile!} />;
}
