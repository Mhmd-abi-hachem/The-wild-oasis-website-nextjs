import Button from "@/components/ui/Button";

function NotFound() {
  return (
    <div className="flex-1 px-6 py-8 md:px-8 md:py-10 lg:py-12 xl:grid">
      <main className="text-center space-y-6 sm:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          This page could not be found{" "}
          <span className="whitespace-nowrap">:(</span>
        </h1>
        <Button href="/">Go back home</Button>
      </main>
    </div>
  );
}

export default NotFound;
