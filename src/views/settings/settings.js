import { inject } from 'aurelia-framework';
import { Connection } from 'plugin/connection';
import { UserSettings } from 'models/user-settings';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import { LANGUAGE_SETTINGS, DATE_FORMAT_SETTINGS, SITEMAP } from 'config/app-config';

@inject(Connection, UserSettings, I18N, Router)
export class Settings {

  constructor(connection, userSettings, i18n, router) {
    this.connection = connection;
    this.userSettings = userSettings;
    this._i18n = i18n;
    this._router = router;
    this.setSettings();
  }

  setSettings() {
    this.settings = {
      language: LANGUAGE_SETTINGS,
      dateFormat: DATE_FORMAT_SETTINGS
    };
  }

  updateLanguage(language) {
    this._i18n.setLocale(language);
  }

  save() {
    return this.userSettings.save().then(() => this._router.navigateToRoute(SITEMAP.home));
  }

}
