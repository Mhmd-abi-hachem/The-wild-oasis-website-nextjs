"use server";

import auth from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function SignUpAction(formData: FormData) {
  const guestName = formData.get("guest-name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // validation
  if (!guestName || !email || !password) {
    return { status: "error", message: "Please fill in all fields" };
  }

  if (password.length < 8) {
    return {
      status: "error",
      message: "Password must be at least 8 characters",
    };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: guestName,
      },
    });

    return { status: "success", message: "Account successfully created" };
  } catch (err) {
    console.error(err);

    if (!(err instanceof Error)) {
      return { status: "error", message: "Something went wrong. Try again" };
    }

    if (err.message?.includes("User already exists.")) {
      return {
        status: "error",
        message: "This email is already registered. Please sign in instead",
      };
    }

    if (err.message?.includes("Invalid email")) {
      return {
        status: "error",
        message: "Please enter a valid email address",
      };
    }

    return {
      status: "error",
      message: "Unable to create account. Please try again",
    };
  }
}

export async function SignInAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // validation
  if (!email || !password) {
    return { status: "error", message: "Please fill in all fields" };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return { status: "success", message: "Successfully signed in" };
  } catch (err) {
    console.error(err);
    if (!(err instanceof Error)) {
      return { status: "error", message: "Something went wrong. Try again" };
    }

    if (err.message?.includes("Invalid email or password")) {
      return {
        status: "error",
        message: "Invalid email or password",
      };
    }

    if (err.message?.includes("Invalid email")) {
      return {
        status: "error",
        message: "Please enter a valid email address",
      };
    }
    return { status: "error", message: "Something went wrong. Try again" };
  }
}

export async function SignOutAction() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (err) {
    console.error(err);
  }

  redirect("/");
}

export async function signInWithGoogle() {
  const { url } = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/account",
    },
  });

  if (url) {
    redirect(url);
  }
}
