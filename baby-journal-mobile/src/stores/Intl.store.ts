import {
  CalendarDate,
  CLDRFramework,
  CLDROptions,
  CurrencyType,
  DateFormatOptions,
  DecimalArg,
  LanguageTag,
  MessageNamedArgs,
  ZonedDateTime,
} from '@phensley/cldr';
// import GermanPack from '@phensley/cldr/packs/de.json';
import EnglishPack from '@phensley/cldr/packs/en.json';
import create from 'zustand';
import { combine } from 'zustand/middleware';
import { dateFormatSkeleton } from '../lib/date';

const supportedLocales = {
  en: EnglishPack,
  // de: GermanPack,
} as const;

type SupportedLocaleStrings = keyof typeof supportedLocales;
// Load English synchronously (see below)
const loader = (languageString: SupportedLocaleStrings) => {
  return supportedLocales[languageString];
};
// Options for initializing the framework
const options: CLDROptions = {
  loader: loader as any,
};
// Global instance of the framework
export const framework = new CLDRFramework(options);
const cldr = framework.get('en');

export const useIntlStore = create(
  combine({ cldr, locale: 'en', currency: 'USD' as CurrencyType }, (set, get) => ({
    setLocale: (locale: string) => {
      set({ locale, cldr: framework.get(locale) });
    },
    formatNumber: (n: DecimalArg) => {
      return get().cldr.Numbers.formatDecimal(n);
    },
    formatCurrency: (n: DecimalArg) => {
      return get().cldr.Numbers.formatCurrency(n, get().currency);
    },
    formatDate: (
      d: CalendarDate | ZonedDateTime | Date,
      options: DateFormatOptions = { skeleton: dateFormatSkeleton.abbreviated },
    ) => {
      return get().cldr.Calendars.formatDate(d, options);
    },
    formatMessage: (m: string, args: MessageNamedArgs) => {
      return get().cldr.General.messageFormatter().format(m, [], args);
    },
    getAvailableLocales: () => {
      return CLDRFramework.availableLocales();
    },
    getLanguageDisplayName: (tag: LanguageTag) => {
      return get().cldr.General.getLanguageDisplayName(tag);
    },
    getRegionDisplayName: (tag: LanguageTag) => {
      return get().cldr.General.getRegionDisplayName(tag);
    },
    resolveLocale: (id: string) => {
      const { tag } = get().cldr.General.resolveLocale(id);
      const language = tag.language();
      const script = tag.script();
      const region = tag.region();
      const currencyCode = get().cldr.Numbers.getCurrencyForRegion(region);
      const currencySymbol = get().cldr.Numbers.getCurrencySymbol(currencyCode);
      return {
        language,
        script,
        region,
        currencyCode,
        currencySymbol,
      };
    },
  })),
);

export const { getState: getIntlState } = useIntlStore;
