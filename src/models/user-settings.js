import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import { DEFAULTUSERSETTINGS } from 'config/app-config';

const keyName = 'kis-minutes.userSettings';

/**
 * Defines the user settings within the application.
 * Settings are stored in local storage and backend.
 */
@inject(I18N)
export class UserSettings {

  /**
   * Creates an instance of the @see UserSettings class with the specified parameters.
   * @param {I18N} i18n - the translation plugin
   */
  constructor(i18n) {
    this._i18n = i18n;
  }

  /**
   * Loads the user settings from the local storage
   * @return {Promise} the promise fetching the frontend locale
   */
  async load() {
    let userSettings = JSON.parse(localStorage.getItem(keyName));
    if (!userSettings) {
      userSettings = DEFAULTUSERSETTINGS;
      localStorage.setItem(keyName, JSON.stringify(userSettings));
    }
    Object.assign(this, ...userSettings);
    return this._i18n.setLocale(this.language);
  }

  /**
   * Saves the current user settings to the backend store.
   * @return {Promise} the promise saving the user settings to the backend store
   */
  async save() {
    let userSettings = {
      language: this.language,
      dateFormat: this.dateFormat
    };
    localStorage.setItem(keyName, JSON.stringify(userSettings));
  }

}
