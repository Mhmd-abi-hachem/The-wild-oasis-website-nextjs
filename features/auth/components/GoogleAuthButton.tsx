import SubmitButton from "@/components/ui/SubmitButton";
import { signInWithGoogle } from "../actions";

function GoogleAuthButton() {
  return (
    <form action={signInWithGoogle}>
      <SubmitButton
        pendingLabel="Redirecting to Google..."
        className="w-full flex items-center justify-center gap-3 text-lg bg-transparent border border-primary-700 hover:bg-primary-900/50 text-primary-100! font-medium! px-6! py-3! cursor-pointer"
      >
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
          className="mb-0.5 sm:mb-1"
        />
        <span>Continue with Google</span>
      </SubmitButton>
    </form>
  );
}

export default GoogleAuthButton;
