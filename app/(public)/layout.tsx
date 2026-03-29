import Header from "@/components/layout/Header/Header";
import { ReservationProvider } from "@/features/cabins/components/ReservationContext";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex-1 px-6 py-8 md:px-8 md:py-10 lg:py-12 xl:grid">
        <main className="max-w-7xl mx-auto w-full">
          <ReservationProvider>{children}</ReservationProvider>
        </main>
      </div>
    </>
  );
}
