/**
 * The application title.
 */
export const APPLICATIONTITLE = 'Fight-Food-Waste';

/**
 * The names of the routes of the application.
 */
export const SITEMAP = {
  home: 'home',
  pendingArticles: 'pending-articles'
};

/**
 * The aurelia routes of the application.
 */
export const ROUTES = [
  { route: ['', 'home'], name: SITEMAP.home, moduleId: 'views/home/home', title: 'Home' },
  { route: 'pending-articles', name: SITEMAP.pendingArticles, moduleId: 'views/pending-articles/pending-articles', title: 'Pending Articles' }
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
