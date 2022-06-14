/* eslint-disable no-console */
import { createInstance, InitOptions } from 'i18next'
import ICU from 'i18next-icu'
import LanguageDetector, { DetectorOptions } from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import {
  TRANSLATIONS_EN_US,
  TRANSLATIONS_ES_ES,
  TRANSLATIONS_PT_BR,
} from './languages'

const NameSpaces = [
  'Common',
]

export const LanguageCode = {
  'en-US': 'en-US',
  'es-ES': 'es-ES',
  'pt-BR': 'pt-BR',
}

const langDetectorOptions: DetectorOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'sessionStorage', 'localStorage', 'navigator'],
  // keys or params to lookup language from
  lookupQuerystring: 'language',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  // cache user language on
  caches: ['localStorage', 'cookie'],
  // languages to not persist (cookie, localStorage)
  excludeCacheFor: ['cimode'],
}

const i18nextPortalOptions: InitOptions = {
  debug: false,
  defaultNS: 'Common',
  fallbackNS: 'Common',
  ns: NameSpaces,
  detection: langDetectorOptions,
  fallbackLng: LanguageCode['en-US'],
  supportedLngs: Object.values(LanguageCode),
  load: 'currentOnly' as const,
  react: {
    useSuspense: true,
  },
  resources: {
    [LanguageCode['en-US']]: TRANSLATIONS_EN_US,
    [LanguageCode['es-ES']]: TRANSLATIONS_ES_ES,
    [LanguageCode['pt-BR']]: TRANSLATIONS_PT_BR,
  },
  returnEmptyString: false, // avoid empty string when there's no available translations yet
}

const i18nPortal = createInstance()
i18nPortal
  .use(ICU)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(i18nextPortalOptions, err => {
    if (err) {
      throw new Error(`[i18next]: something went wrong loading: ${err.toString()}`)
    }
  })

export default i18nPortal
