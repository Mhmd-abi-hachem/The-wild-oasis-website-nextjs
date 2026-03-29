import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-primary-800 h-full">
      <p className="text-center text-lg sm:text-xl py-12 self-center">
        Please{" "}
        <Link
          href="/sign-in"
          className="underline text-accent-500 hover:text-accent-600 transition-colors"
        >
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
