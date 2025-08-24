import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import i18nConfig from '../../next-i18next.config';

export async function getTranslation(locale: string, ns: string = 'common') {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (lng: string, ns: string) =>
          import(`../../public/locales/${lng}/${ns}.json`)
      )
    )
    .init({
      lng: locale,
      fallbackLng: i18nConfig.i18n.defaultLocale,
      ns: [ns],
    });

  return {
    t: i18nInstance.getFixedT(locale, ns) as (key: string) => string,
  };
}
