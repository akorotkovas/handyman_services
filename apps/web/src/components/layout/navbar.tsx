"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Menu,
  X,
  Search,
  User,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <nav className="container-main">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-primary-500)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">H</span>
            </div>
            <span className="font-heading font-bold text-xl text-[var(--color-text-primary)]">
              Handyman
              <span className="text-[var(--color-primary-500)]"> Services</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-[var(--color-primary-500)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              {t("findTradesperson")}
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {t("howItWorks")}
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {t("forTradespeople")}
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-2"
            >
              {tc("signIn")}
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-white bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-600)] transition-colors px-5 py-2.5 rounded-lg"
            >
              {tc("signUp")}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-sm font-medium text-[var(--color-text-secondary)] px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("findTradesperson")}
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-[var(--color-text-secondary)] px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("howItWorks")}
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-[var(--color-text-secondary)] px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("forTradespeople")}
              </Link>
              <hr className="border-gray-200" />
              <Link
                href="/login"
                className="text-sm font-medium text-[var(--color-text-primary)] px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tc("signIn")}
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-[var(--color-primary-500)] text-center rounded-lg px-4 py-2.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {tc("signUp")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
