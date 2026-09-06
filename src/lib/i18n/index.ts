import { en, type Dictionary } from "./en";
import { id } from "./id";
import { DEFAULT_LOCALE, type Locale } from "./config";

const DICTIONARIES: Record<Locale, Dictionary> = { en, id };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? DICTIONARIES[DEFAULT_LOCALE];
}

export type { Dictionary };
export * from "./config";
