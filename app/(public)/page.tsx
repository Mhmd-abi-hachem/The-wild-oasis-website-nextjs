import Button from "@/components/ui/Button";
import background from "@/public/bg.png";
import Image from "next/image";

export default function Page() {
  return (
    <section className="h-full w-full pt-16 xl:pt-24">
      <Image
        src={background}
        alt="Mountains and forests with two cabins"
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
      />

      <div className="relative z-10 text-center px-4 sm:px-6 flex flex-col items-center gap-5 md:gap-7 lg:gap-10">
        <h1 className="text-6xl md:text-7xl lg:text-8xl text-primary-50 tracking-tight leading-none font-normal">
          Welcome to paradise.
        </h1>

        <Button href="/cabins" className="py-6">
          Explore luxury cabins
        </Button>
      </div>
    </section>
  );
}
