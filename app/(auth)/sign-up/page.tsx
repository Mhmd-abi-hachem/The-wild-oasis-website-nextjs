import Image from "next/image";
import AuthImage from "@/public/auth.webp";
import SignupForm from "@/features/auth/components/SignupForm";
import Logo from "@/components/ui/Logo";

export default function Page() {
  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-black/40 z-10"></div>

        <Image
          src={AuthImage}
          alt="Cozy cabin in the mountains at dusk with warm lights"
          fill
          placeholder="blur"
          className="object-cover"
        />

        <div className="h-full flex flex-col justify-between items-start">
          <div className="pt-6 z-20 scale-75">
            <Logo />
          </div>
          <div className="pb-7 pl-7 z-20 max-w-lg">
            <h2 className="text-4xl font-[350] mb-3">Welcome to paradise.</h2>
            <p className="text-lg opacity-90 font-light leading-relaxed pl-1">
              Join nature lovers who have found their perfect escape. Create
              unforgettable memories surrounded by nature&apos;s splendor.
            </p>
          </div>
        </div>
      </div>

      <SignupForm />
    </div>
  );
}
