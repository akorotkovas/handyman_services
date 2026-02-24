import { getTranslations } from "next-intl/server";
import { Search } from "lucide-react";

export async function HeroSection() {
  const t = await getTranslations("home");

  return (
    <section className="relative bg-gradient-to-br from-[var(--color-primary-500)] via-[var(--color-primary-600)] to-[var(--color-primary-700)] text-white">
      <div className="container-main py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t("heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {t("heroSubtitle")}
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-12 pr-4 py-3.5 text-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-sm"
                />
              </div>
              <div className="sm:w-44">
                <input
                  type="text"
                  placeholder={t("cityPlaceholder")}
                  className="w-full px-4 py-3.5 text-gray-900 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] text-sm"
                />
              </div>
              <button className="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm whitespace-nowrap">
                {t("searchButton")}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { value: "2,500+", label: t("statsTradespeople") },
              { value: "15,000+", label: t("statsReviews") },
              { value: "8,000+", label: t("statsJobs") },
              { value: "50+", label: t("statsCities") },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 32C240 64 480 0 720 32C960 64 1200 0 1440 32V64H0V32Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
