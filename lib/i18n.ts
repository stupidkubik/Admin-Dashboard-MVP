import en from "@/locales/en";
import ru from "@/locales/ru";
import es from "@/locales/es";
import fr from "@/locales/fr";

export const SUPPORTED_LOCALES = ["en", "ru", "es", "fr"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

type NestedTranslationKey<T extends object> = {
  [Key in keyof T & string]: T[Key] extends string
    ? Key
    : T[Key] extends object
      ? `${Key}.${NestedTranslationKey<T[Key]>}`
      : never;
}[keyof T & string];

export type TranslationKey = NestedTranslationKey<typeof en>;

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && SUPPORTED_LOCALES.includes(value as Locale);

export const resolveLocale = (value: unknown): Locale =>
  isLocale(value) ? value : DEFAULT_LOCALE;

interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

const dictionaries: Record<Locale, TranslationDictionary> = {
  en,
  ru,
  es,
  fr,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export function translate(
  dictionary: TranslationDictionary,
  key: string,
  fallback?: string,
) {
  const segments = key.split(".");
  let current: string | TranslationDictionary | undefined = dictionary;
  for (const segment of segments) {
    if (typeof current === "object" && segment in current) {
      current = current[segment];
    } else {
      return fallback ?? key;
    }
  }

  if (typeof current === "string") {
    return current;
  }

  return fallback ?? key;
}
