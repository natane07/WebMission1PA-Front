/**
 * The application title.
 */
export const APPLICATIONTITLE = 'Fight-Food-Waste';

/**
 * The names of the routes of the application.
 */
export const SITEMAP = {
  home: 'home',
  minutes: 'minutes',
  minute: 'minute'
};

/**
 * The aurelia routes of the application.
 */
export const ROUTES = [
  { route: ['', 'home'], name: SITEMAP.home, moduleId: 'views/home/home', title: 'Home' },
  { route: 'minutes', name: SITEMAP.minutes, moduleId: 'views/minutes/minutes', title: 'Minutes' },
  { route: 'minutes/:id', name: SITEMAP.minute, moduleId: 'views/minute/minute', title: 'Minute Details' }
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
