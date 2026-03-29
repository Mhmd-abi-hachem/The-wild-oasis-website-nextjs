import Button from "@/components/ui/Button";
import Cabin from "@/models/cabinModel";
import aboutImage from "@/public/about-1.jpg";
import Image from "next/image";

export const revalidate = 86400;

export default async function Page() {
  const cabinsNum = await Cabin.countDocuments();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 md:gap-x-16 lg:gap-x-24 gap-y-12 md:gap-y-16 lg:gap-y-24 xl:gap-y-32 text-base md:text-lg items-center">
      <div className="lg:col-span-3">
        <h1 className="text-3xl md:text-4xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 text-accent-400 font-medium tracking-tighter">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-6 lg:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the Italian Dolomites, this is your
            paradise away from home. But it&apos;s not just about the luxury
            cabins. It&apos;s about the experience of reconnecting with nature
            and enjoying simple pleasures with family.
          </p>
          <p>
            Our {cabinsNum} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
            Wander through lush forests, breathe in the fresh air, and watch the
            stars twinkle above from the warmth of a campfire or your hot tub.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor. It&apos;s a place to slow down, relax, and
            feel the joy of being together in a beautiful setting.
          </p>
        </div>
      </div>

      <div className="lg:col-span-2">
        <Image
          src={aboutImage}
          alt="Family sitting around a fire pit in front of cabin"
          placeholder="blur"
        />
      </div>

      <div className="relative aspect-square lg:col-span-2 order-last lg:order-0">
        <Image
          fill
          className="object-cover"
          src="/about-2.jpg"
          alt="Family that manages The Wild Oasis"
        />
      </div>

      <div className="lg:col-span-3">
        <h2 className="text-3xl md:text-4xl mb-4 sm:mb-5 md:mb-6 lg:mb-8 xl:mb-10 text-accent-400 font-medium tracking-tighter">
          Managed by our family since 1962
        </h2>

        <div className="space-y-6 lg:space-y-8">
          <p>
            Since 1962, The Wild Oasis has been a cherished family-run retreat.
            Started by our grandparents, this haven has been nurtured with love
            and care, passing down through our family as a testament to our
            dedication to creating a warm, welcoming environment.
          </p>
          <p>
            Over the years, we&apos;ve maintained the essence of The Wild Oasis,
            blending the timeless beauty of the mountains with the personal
            touch only a family business can offer. Here, you&apos;re not just a
            guest; you&apos;re part of our extended family. So join us at The
            Wild Oasis soon, where tradition meets tranquility, and every visit
            is like coming home.
          </p>

          <Button href="/cabins" className="inline-block! mt-2 md:mt-3 lg:mt-4">
            Explore our luxury cabins
          </Button>
        </div>
      </div>
    </div>
  );
}
