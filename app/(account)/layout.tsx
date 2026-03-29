import Header from "@/components/layout/Header/Header";
import SideNavigation from "@/features/profile/components/SideNavigation";
import auth from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex-1 flex flex-col xl:grid xl:grid-cols-[16rem_1fr] gap-1 xl:gap-12 overflow-hidden min-h-0">
        <div className="xl:h-full xl:overflow-hidden">
          <SideNavigation />
        </div>
        <div className="xl:py-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
