import { ui, languages, defaultLang, showDefaultLang, routes } from './ui';

export function getLangFromUrl(url: URL): string {
  const [, lang] = url.pathname.split('/');
  return Object.keys(languages).includes(lang) ? lang : defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function getRouteKeyFromUrl(url: URL): string | null {
  const parts = url.pathname.split('/').filter(Boolean);
  const lang = getLangFromUrl(url);

  // Získaj slug podľa toho, či je defaultLang bez prefixu alebo nie
  let slug: string | undefined;
  if (lang === defaultLang && !showDefaultLang) {
    slug = parts[0];
  } else {
    slug = parts[1];
  }
  if (!slug) return null;

  // Prejdi všetky route keys a nájdi ten, ktorý má v danom jazyku tento slug
  for (const key of Object.keys(routes.sk)) {
    if (routes[lang][key] === slug) return key;
  }
  return null;
}

export function getTranslatedPath(routeKey: string | null, lang: string): string {
  if (!routeKey || routeKey === 'index') {
    if (lang === defaultLang && !showDefaultLang) return '/';
    return `/${lang}`;
  }
  const slug = routes[lang][routeKey];
  if (!slug) return '/';
  if (lang === defaultLang && !showDefaultLang) return `/${slug}`;
  return `/${lang}/${slug}`;
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    // path v tomto prípade by už mal byť čistý kľúč routy (napr. 'kontakt')
    // NIE '/kontakt' a NIE '/en/contact'
    const pathName = path.replaceAll('/', ''); // Toto je v poriadku, ak 'path' už je čistý kľúč

    const hasTranslation = defaultLang !== l && routes[l] !== undefined && routes[l][pathName] !== undefined;
    const translatedPath = hasTranslation ? '/' + routes[l][pathName] : path; // Preloží kľúč na preloženú cestu a pridá '/'

    // Tu sa pridáva jazykový prefix (alebo sa nepridá, ak showDefaultLang je false a je to defaultLang)
    // Toto je miesto, kde sa URL skladá
    return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`;
  }
};

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop(); // Toto získa poslednú časť cesty

  if (path === undefined) {
    return undefined;
  }

  const currentLang = getLangFromUrl(url);

  if (defaultLang === currentLang) {
    // Ak je predvolený jazyk, hľadá v routes[defaultLang] hodnotu 'path' a vracia kľúč
    const route = routes[defaultLang]; // Toto je Object.values(routes)[0] premenené na routes[defaultLang]
    return Object.keys(route).find((key) => route[key] === path); // Hľadá kľúč podľa hodnoty
  }

  // Ak je iný jazyk, hľadá v routes[currentLang] hodnotu 'path' a vracia kľúč
  const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined  => {
      return Object.keys(obj).find((key) => obj[key] === value);
  }

  const reservedKey = getKeyByValue(routes[currentLang], path);

  if (reservedKey !== undefined) {
    return reservedKey;
  }

  return undefined;
}