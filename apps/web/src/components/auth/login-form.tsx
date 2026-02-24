"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { loginWithCredentials } from "@/lib/actions/auth";
import { Button } from "@meistrai/ui";
import { Input } from "@meistrai/ui";
import { Mail, Lock } from "lucide-react";

export function LoginForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await loginWithCredentials(email, password);

    if (!result.success) {
      setError(result.error ?? t("loginError"));
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">
          {t("loginTitle")}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          {t("loginSubtitle")}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <input type="checkbox" name="remember" className="rounded" />
            {t("rememberMe")}
          </label>
          <Link
            href="/forgot-password"
            className="text-sm text-[var(--color-primary-500)] hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading} className="w-full">
          {tc("signIn")}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[var(--color-text-secondary)]">
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="text-[var(--color-primary-500)] font-medium hover:underline"
        >
          {tc("signUp")}
        </Link>
      </div>
    </div>
  );
}
