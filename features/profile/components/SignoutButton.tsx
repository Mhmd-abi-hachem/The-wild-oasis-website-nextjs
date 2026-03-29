import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { SignOutAction } from "../../auth/actions";

function SignOutButton() {
  return (
    <form action={SignOutAction}>
      <button className="py-2 sm:py-3 px-3 sm:px-4 md:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full cursor-pointer">
        <ArrowRightOnRectangleIcon className="size-5 text-primary-600" />
        <span className="hidden lg:inline lg:mt-1 xl:mt-0">Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
