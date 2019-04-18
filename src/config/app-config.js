/**
 * The application title.
 */
export const APPLICATIONTITLE = 'Fight-Food-Waste';

/**
 * The names of the routes of the application.
 */
export const SITEMAP = {
  home: 'home',
  pendingArticles: 'pending-articles',
  settings: 'settings'
};

/**
 * The aurelia routes of the application.
 */
export const ROUTES = [
  {
    route: ['', 'home'],
    nav: true,
    name: SITEMAP.home,
    moduleId: 'views/home/home',
    title: 'Home',
    settings: { breadcrumb: true, order: 0 }
  },
  {
    route: 'pending-articles',
    nav: true,
    name: SITEMAP.pendingArticles,
    moduleId: 'views/pending-articles/pending-articles',
    title: 'Pending Articles',
    settings: { breadcrumb: true, order: 0 }
  },
  {
    route: 'settings',
    nav: true,
    name: SITEMAP.settings,
    moduleId: 'views/settings/settings',
    title: 'User Settings'
  }
];

/**
 * The common settings of the iziToast component.
 */
export const TOASTSETTINGS = {
  animateInside: false,
  timeout: 100000,
  theme: 'dark',
  resetOnHover: true,
  position: 'center',
  transitionIn: 'fadeIn',
  layout: 2
};

export const DEFAULTUSERSETTINGS = {
  language: 'en',
  dateFormat: 'dd/mm/yyyy'
};

export const LANGUAGE_SETTINGS = [
  {
    code: 'en',
    description: 'English'
  },
  {
    code: 'fr',
    description: 'Français'
  }
];

export const DATE_FORMAT_SETTINGS = ['dd/mm/yyyy', 'mm/dd/yyyy'];
