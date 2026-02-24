import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { HowItWorksSection } from "@/components/home/how-it-works-section";
import { BenefitsSection } from "@/components/home/benefits-section";
import { CtaSection } from "@/components/home/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return {
    title: "Handyman Services — " + t("heroTitle"),
    description: t("heroSubtitle"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <CtaSection />
    </>
  );
}
