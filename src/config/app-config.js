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
  settings: 'settings',
  createCategory: 'create-category',
  gathering: 'gathering',
  createGathering: 'create-gathering',
  stock: 'stock',
  article: 'article',
  delivery: 'delivery',
  createDelivery: 'create-delivery',
  shop: 'shop'
};

/**
 * The aurelia routes of the application.
 */
export const ROUTES = [
  {
    route: ['', SITEMAP.home],
    nav: true,
    name: SITEMAP.home,
    moduleId: 'views/home/home',
    title: 'routes.home',
    settings: { breadcrumb: true, order: 0 }
  },
  {
    route: SITEMAP.pendingArticles,
    nav: true,
    name: SITEMAP.pendingArticles,
    moduleId: 'views/pending-articles/pending-articles',
    title: 'routes.pending-articles',
    settings: { breadcrumb: true, order: 1 }
  },
  {
    route: SITEMAP.settings,
    nav: true,
    name: SITEMAP.settings,
    moduleId: 'views/settings/settings',
    title: 'routes.settings'
  },
  {
    route: SITEMAP.createCategory,
    nav: true,
    name: SITEMAP.createCategory,
    moduleId: 'views/create-category/create-category',
    title: 'routes.create-category'
  },
  {
    route: SITEMAP.gathering,
    nav: true,
    name: SITEMAP.gathering,
    moduleId: 'views/gathering/gathering',
    title: 'routes.gathering',
    settings: { breadcrumb: true, order: 2 }
  },
  {
    route: SITEMAP.createGathering,
    nav: true,
    name: SITEMAP.createGathering,
    moduleId: 'views/create-gathering/create-gathering',
    title: 'routes.create-gathering'
  },
  {
    route: SITEMAP.stock,
    nav: true,
    name: SITEMAP.stock,
    moduleId: 'views/stock/stock',
    title: 'routes.stock',
    settings: { breadcrumb: true, order: 3 }
  },
  {
    route: SITEMAP.article,
    nav: true,
    name: SITEMAP.article,
    moduleId: 'views/article/article',
    title: 'routes.article'
  },
  {
    route: SITEMAP.delivery,
    nav: true,
    name: SITEMAP.delivery,
    moduleId: 'views/delivery/delivery',
    title: 'routes.delivery',
    settings: { breadcrumb: true, order: 4 }
  },
  {
    route: SITEMAP.createDelivery,
    nav: true,
    name: SITEMAP.createDelivery,
    moduleId: 'views/create-delivery/create-delivery',
    title: 'routes.create-delivery'
  },
  {
    route: SITEMAP.shop,
    nav: true,
    name: SITEMAP.shop,
    moduleId: 'views/shop/shop',
    title: 'routes.shop'
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
