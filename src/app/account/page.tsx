"use client";

import { SignInForm } from "@/components/SignInForm";
import { SignUpForm } from "@/components/SignUpForm";

export default function AuthPage() {
  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-16">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">
          Welcome to Habitra
        </h1>

        <div className="grid w-full gap-6 md:grid-cols-2">
          <SignUpForm />
          <SignInForm />
        </div>
      </main>
    </div>
  );
}
