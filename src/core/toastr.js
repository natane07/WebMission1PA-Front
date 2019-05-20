import iziToast from 'izitoast';
import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
/**
 * The popup service that displays transient messages.
 */
@inject(I18N)
export class Toastr {

  constructor(i18n) {
    this._i18n = i18n;
  }

  /**
   * Popups an information message.
   * @param {string} message - The message to show.
   */
  info(message) {
    iziToast.info({ title: this._i18n.tr('error.info'), message: message || '' });
  }

  /**
   * Popups a warning message.
   * @param {string} message - The message to show.
   */
  warning(message) {
    iziToast.warning({ title: this._i18n.tr('error.warning'), message: message || '' });
  }

  /**
   * Popups an error message.
   * @param {string} message - The message to show.
   */
  error(message) {
    iziToast.error({ title: this._i18n.tr('error.title'), message: message || '' });
  }

}
