"use client";

import Button from "@/components/ui/Button";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex-1 px-6 py-8 md:px-8 md:py-10 lg:py-12 xl:grid">
      <main className="text-center space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Something went wrong!
        </h1>
        <p className="text-lg">{error.message}</p>

        <Button onClick={reset}>Try again</Button>
      </main>
    </div>
  );
}
