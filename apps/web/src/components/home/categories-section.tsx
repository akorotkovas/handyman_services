import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import {
  Wrench,
  Zap,
  HardHat,
  PaintBucket,
  Home,
  Thermometer,
  Layers,
  DoorOpen,
  Trees,
  SprayCan,
  Armchair,
  Lock,
  Bug,
  Wind,
  Hammer,
} from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  plumbing: <Wrench className="w-7 h-7" />,
  electrical: <Zap className="w-7 h-7" />,
  construction: <HardHat className="w-7 h-7" />,
  renovation: <Hammer className="w-7 h-7" />,
  painting: <PaintBucket className="w-7 h-7" />,
  roofing: <Home className="w-7 h-7" />,
  flooring: <Layers className="w-7 h-7" />,
  windows: <DoorOpen className="w-7 h-7" />,
  heating: <Thermometer className="w-7 h-7" />,
  landscaping: <Trees className="w-7 h-7" />,
  cleaning: <SprayCan className="w-7 h-7" />,
  furniture: <Armchair className="w-7 h-7" />,
  locksmith: <Lock className="w-7 h-7" />,
  pest: <Bug className="w-7 h-7" />,
  airConditioning: <Wind className="w-7 h-7" />,
};

const categoryKeys = [
  "plumbing",
  "electrical",
  "construction",
  "renovation",
  "painting",
  "roofing",
  "flooring",
  "windows",
  "heating",
  "landscaping",
  "cleaning",
  "furniture",
] as const;

export async function CategoriesSection() {
  const t = await getTranslations("home");
  const tc = await getTranslations("categories");

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12">
          {t("popularCategories")}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoryKeys.map((key) => (
            <Link
              key={key}
              href="/"
              className="group flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 hover:border-[var(--color-primary-500)] hover:shadow-lg transition-all"
            >
              <div className="text-[var(--color-primary-500)] group-hover:scale-110 transition-transform">
                {categoryIcons[key]}
              </div>
              <span className="text-sm font-medium text-center text-[var(--color-text-primary)]">
                {tc(key)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
