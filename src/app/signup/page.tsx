"use client";

import { Navbar } from "@/components/Navbar";
import { SignInForm } from "@/components/SignInForm";
import { SignUpForm } from "@/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <SignUpForm />
      <SignInForm />
    </div>
  );
}
