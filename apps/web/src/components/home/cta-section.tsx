import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export async function CtaSection() {
  const t = await getTranslations("home");

  return (
    <section className="section-padding bg-gradient-to-r from-[var(--color-primary-600)] to-[var(--color-primary-700)]">
      <div className="container-main text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-lg text-blue-100 mb-8 max-w-xl mx-auto">
          {t("ctaSubtitle")}
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 bg-white text-[var(--color-primary-600)] font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg"
        >
          {t("ctaButton")}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
