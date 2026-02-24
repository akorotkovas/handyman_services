export const locales = ["lt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "lt";
