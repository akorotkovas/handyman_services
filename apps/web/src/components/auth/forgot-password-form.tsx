"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button, Input } from "@meistrai/ui";
import { ArrowLeft, CheckCircle } from "lucide-react";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Call server action to send reset email
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setIsLoading(false);
  }

  if (sent) {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-[var(--color-accent-500)] mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-bold mb-2">
          {t("resetSent")}
        </h1>
        <Link
          href="/login"
          className="text-[var(--color-primary-500)] font-medium hover:underline inline-flex items-center gap-1 mt-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {tc("signIn")}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="font-heading text-3xl font-bold mb-2">
          {t("forgotPasswordTitle")}
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          {t("forgotPasswordSubtitle")}
        </p>
      </div>

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

        <Button type="submit" isLoading={isLoading} className="w-full">
          {t("sendResetLink")}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm text-[var(--color-primary-500)] font-medium hover:underline inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          {tc("signIn")}
        </Link>
      </div>
    </div>
  );
}
