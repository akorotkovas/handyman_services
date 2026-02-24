import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-main py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--color-primary-500)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Handyman<span className="text-[var(--color-primary-400)]"> Services</span>
              </span>
            </div>
            <p className="text-sm">{t("tagline")}</p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              {t("about")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  {t("howItWorks")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  {t("forTradespeople")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  {t("categories")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              {t("support")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">
              Teisinė informacija
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  {t("cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
