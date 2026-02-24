import { getTranslations } from "next-intl/server";
import { Shield, BadgeCheck, Receipt, Scale } from "lucide-react";

export async function BenefitsSection() {
  const t = await getTranslations("home");

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: t("benefit1Title"),
      desc: t("benefit1Desc"),
    },
    {
      icon: <BadgeCheck className="w-8 h-8" />,
      title: t("benefit2Title"),
      desc: t("benefit2Desc"),
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: t("benefit3Title"),
      desc: t("benefit3Desc"),
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: t("benefit4Title"),
      desc: t("benefit4Desc"),
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">
          {t("whyChooseUs")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className="flex gap-5 p-6 rounded-xl border border-gray-200"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[var(--color-accent-50)] text-[var(--color-accent-600)] flex items-center justify-center">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
