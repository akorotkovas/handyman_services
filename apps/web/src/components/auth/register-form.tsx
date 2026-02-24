"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { registerUser } from "@/lib/actions/auth";
import { Button, Input } from "@meistrai/ui";
import { User, HardHat } from "lucide-react";
import type { RegisterInput } from "@meistrai/types";

export function RegisterForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"CUSTOMER" | "TRADESPERSON">("CUSTOMER");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const input: RegisterInput = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      role,
      acceptTerms: formData.get("acceptTerms") === "on" ? true : (false as unknown as true),
    };

    const result = await registerUser(input);

    if (!result.success) {
      setError(result.error ?? "Registracija nepavyko");
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">
          {t("registerTitle")}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          {t("registerSubtitle")}
        </p>
      </div>

      {/* Role Selector */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setRole("CUSTOMER")}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
            role === "CUSTOMER"
              ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <User
            className={`w-6 h-6 ${
              role === "CUSTOMER"
                ? "text-[var(--color-primary-500)]"
                : "text-gray-400"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              role === "CUSTOMER"
                ? "text-[var(--color-primary-500)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            {t("registerAsCustomer")}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setRole("TRADESPERSON")}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
            role === "TRADESPERSON"
              ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <HardHat
            className={`w-6 h-6 ${
              role === "TRADESPERSON"
                ? "text-[var(--color-primary-500)]"
                : "text-gray-400"
            }`}
          />
          <span
            className={`text-sm font-medium ${
              role === "TRADESPERSON"
                ? "text-[var(--color-primary-500)]"
                : "text-[var(--color-text-secondary)]"
            }`}
          >
            {t("registerAsTradesperson")}
          </span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            id="firstName"
            name="firstName"
            label={t("firstName")}
            placeholder="Jonas"
            required
          />
          <Input
            id="lastName"
            name="lastName"
            label={t("lastName")}
            placeholder="Jonaitis"
            required
          />
        </div>

        <Input
          id="email"
          name="email"
          type="email"
          label={tc("email")}
          placeholder="jusu@pastas.lt"
          required
          autoComplete="email"
        />

        <Input
          id="password"
          name="password"
          type="password"
          label={tc("password")}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label={t("confirmPassword")}
          placeholder="••••••••"
          required
          autoComplete="new-password"
        />

        <label className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
          <input
            type="checkbox"
            name="acceptTerms"
            className="rounded mt-0.5"
            required
          />
          <span>{t("acceptTerms")}</span>
        </label>

        <Button type="submit" isLoading={isLoading} className="w-full">
          {tc("signUp")}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
        {t("hasAccount")}{" "}
        <Link
          href="/login"
          className="text-[var(--color-primary-500)] font-medium hover:underline"
        >
          {tc("signIn")}
        </Link>
      </div>
    </div>
  );
}
