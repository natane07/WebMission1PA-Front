import iziToast from 'izitoast';
import { inject } from 'aurelia-framework';
import { I18N } from 'aurelia-i18n';
import environment from 'environment';

/**
 * Implements a custom interceptor that shows an izitoast error popup when an http error occurs.
 */
@inject(I18N)
export class ErrorInterceptor {

  constructor(i18n) {
    this._i18n = i18n;
  }

  /**
   * Intercepts and handles the response error.
   * @param {ResponseMessage} responseError - the intercepted response error
   */
  async responseError(responseError) {
    if (responseError.status !== 401) {
      this.showApiError(responseError);
    }
    throw responseError;
  }

  /**
   * Intercepts and handles the request error.
   * @param {RequestMessage} requestError - the intercepted request error
   */
  async requestError(requestError) {
    this.showApiError(requestError);
    throw requestError;
  }

  /**
   * Logs an error concerning an API call.
   * @param {ResponseMessage} responseError - the intercepted response error
   */
  async showApiError(responseError) {
    if (environment.debug) {
      extractMessage(responseError, this._i18n.tr('error.defaultMessage')).then(message => iziToast.error({ title: this._i18n.tr('error.title'), message }));
    } else {
      iziToast.error({
        title: this._i18n.tr('error.title'),
        message: this._i18n.tr('error.defaultMessage')
      });
    }
  }

}

/**
 * Extracts the message from the given fault.
 * @param {any} fault - the fault to parse
 * @param {string} fallbackMessage - fallback message if Response doesn't contain specific Message
 * @return {Promise} the promise to get the message.
 */
function extractMessage(fault, fallbackMessage) {
  let message = fallbackMessage;

  //Http Errors
  if (fault instanceof Response || fault.httpResponse instanceof Response) {
    let httpResponse = fault.httpResponse || fault;
    return httpResponse.text().then(text => {
      message = `Http code <strong>${httpResponse.status}</strong>`;
      if (httpResponse.statusText) {
        message += `: <em>${httpResponse.statusText}</em>`;
      }
      const detail = getExceptionMessage(text);
      message += `<section><small>${detail}</small></section>`;
      return message;
    });
  }

  // Basic errors
  if (fault.message) {
    message = `${fault.message}`;
  }
  return Promise.resolve(message);
}

/**
 * Tries to find detailed information in the given text.
 * @param {string} text - the text to parse.
 * @return {string} a detailed message or an empty string.
 */
function getExceptionMessage(text) {
  try {
    let exceptionObject = JSON.parse(text);
    if (exceptionObject) {
      return (
        exceptionObject.ExceptionMessage ||
        exceptionObject.Message ||
        exceptionObject.message ||
        ''
      );
    }
  } catch (e) {
    return text;
  }
  return text;
}
