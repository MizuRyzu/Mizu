export const showDefaultLang = false;

export const languages = {
  sk: 'SK',
  cz: 'CZ',
  en: 'EN',
  la: 'LA',
};

export const defaultLang = 'sk';

export const routes = {
  sk: {
    'index': 'index',
    'zrucnosti': 'zrucnosti',
    'porfolio': 'portfolio',
    'kontakt': 'kontakt',
    'skusenosti': 'skusenosti',
    'o-mne': 'o-mne',
  },
  cz: {
    'index': 'index',
    'zrucnosti': 'dovednosti',
    'porfolio': 'portfolio',
    'kontakt': 'kontakt',
    'skusenosti': 'zkusenosti',
    'o-mne': 'o-mne',
  },
  en: {
    'index': 'index',
    'zrucnosti': 'skills',
    'porfolio': 'portfolio',
    'kontakt': 'contact',
    'skusenosti': 'experience',
    'o-mne': 'about-me',
  },
  la: {
    'index': 'index',
    'zrucnosti': 'habilitates',
    'porfolio': 'portfolio',
    'kontakt': 'contactus',
    'skusenosti': 'experientia',
    'o-mne': 'de-me',
  }
};

export const ui = {
  sk: {
    'home.heading': 'Mižu',
  },
  cz: {
    'home.heading': 'Mižu',
  },
  en: {
    'home.heading': 'Mižu',
  },
  la: {
    'home.heading': 'Mižu',
  }
} as const;