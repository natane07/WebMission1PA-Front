import { PLATFORM } from 'aurelia-pal';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { TCustomAttribute } from 'aurelia-i18n';
import Backend from 'i18next-xhr-backend';
import moment from 'moment';
import { AppRouter } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

import environment from './environment';
import configureOpenidPlugin from 'config/openid-config';
import { TOASTSETTINGS } from 'config/app-config';

import izitoast from 'izitoast';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-configuration'))
    .plugin('./plugin/index', () => configureOpenidPlugin(aurelia))
    .plugin(PLATFORM.moduleName('aurelia-i18n'), instance => {
      let aliases = ['t', 'i18n'];
      TCustomAttribute.configureAliases(aliases);
      instance.i18next.use(Backend);
      instance.i18next.on('languageChanged', lng => {
        moment.locale(lng);
      });

      return instance
        .setup({
          backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json'
          },
          attributes: aliases,
          lng: 'en',
          fallbackLng: 'en',
          debug: true
        })
        .then(() => {
          const router = aurelia.container.get(AppRouter);
          router.transformTitle = title => instance.tr(title);
          const eventAggregator = aurelia.container.get(EventAggregator);
          eventAggregator.subscribe('i18n:locale:changed', () => {
            router.updateTitle();
          });
        });
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  izitoast.settings(TOASTSETTINGS);

  aurelia.start().then(() => aurelia.setRoot());
}
