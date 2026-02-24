import { getTranslations } from "next-intl/server";
import { FileText, GitCompare, CreditCard, Star } from "lucide-react";

export async function HowItWorksSection() {
  const t = await getTranslations("home");

  const steps = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: t("step1Title"),
      desc: t("step1Desc"),
      number: "01",
    },
    {
      icon: <GitCompare className="w-8 h-8" />,
      title: t("step2Title"),
      desc: t("step2Desc"),
      number: "02",
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: t("step3Title"),
      desc: t("step3Desc"),
      number: "03",
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: t("step4Title"),
      desc: t("step4Desc"),
      number: "04",
    },
  ];

  return (
    <section className="section-padding bg-[var(--color-surface)]">
      <div className="container-main">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
          {t("howItWorksTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary-50)] text-[var(--color-primary-500)] mb-5">
                {step.icon}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--color-primary-500)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                {step.number}
              </div>
              <h3 className="font-heading text-lg font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
