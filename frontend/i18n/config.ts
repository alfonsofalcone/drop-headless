export type Locale = (typeof locales)[number];
export const locales = ['en', 'it'] as const;
export const defaultLocale = Locale = 'en';
export const localeDetection = false;