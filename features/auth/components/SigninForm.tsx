"use client";

import Separator from "@/components/ui/Separator";
import SubmitButton from "@/components/ui/SubmitButton";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SignInAction } from "../actions";
import GoogleAuthButton from "./GoogleAuthButton";

export default function SigninForm() {
  const router = useRouter();

  async function signIn(formData: FormData) {
    try {
      const res = await SignInAction(formData);

      if (res.status === "success") {
        toast.success(res.message);
        router.push("/account");
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again");
    }
  }

  return (
    <div className="flex items-start justify-center px-6 py-12 md:py-14 lg:py-16 overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-2 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl text-accent-400 font-medium">
            Sign in to your account
          </h1>
          <p className="text-primary-100/80">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form action={signIn} className="mt-6 sm:mt-7 md:mt-8 mb-4">
          <div className="space-y-5">
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="group relative rounded-sm shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="size-4 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                </div>
                <input
                  className="appearance-none block w-full pl-10 px-3 py-2 sm:py-3 border border-gray-700 rounded-sm placeholder-gray-500 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm bg-surface-dark text-gray-100 transition-colors"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  type="email"
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-300 mb-1.5 md:mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="group relative rounded-sm shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="size-4 text-gray-400 group-focus-within:text-accent-400 transition-colors" />
                </div>
                <input
                  className="appearance-none block w-full pl-10 px-3 py-2 sm:py-3 border border-gray-700 rounded-sm placeholder-gray-500 focus:outline-none focus:ring-accent-500 focus:border-accent-500 sm:text-sm bg-surface-dark text-gray-100 transition-colors"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                />
              </div>
            </div>
          </div>

          <SubmitButton pendingLabel="Signing in..." className="w-full mt-6">
            Sign in
          </SubmitButton>
        </form>

        <Separator className="mb-4" />

        <GoogleAuthButton />

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?
            <Link
              className="font-medium text-accent-400 hover:text-accent-600 ml-1 transition-colors"
              href="/sign-up"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
