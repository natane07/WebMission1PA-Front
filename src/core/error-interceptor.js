import iziToast from 'izitoast';

import environment from 'environment';

const popupTitle = 'Erreur';
const defaultErrorMessage = "Une erreur de communication s'est produite.";

/**
 * Implements a custom interceptor that shows an izitoast error popup when
 * an http error occurs.
 */
export class ErrorInterceptor {

  /**
   * Intercepts and handles the response error.
   * @param {ResponseMessage} responseError - the intercepted response error
   */
  async responseError(responseError) {
    if (responseError.status !== 401) {
      showApiError(responseError);
    }
    throw responseError;
  }

}

/**
 * Logs an error concerning an API call.
   * @param {ResponseMessage} responseError - the intercepted response error
 */
function showApiError(responseError) {
  if (environment.debug) {
    extractMessage(responseError).then(message => iziToast.error({ title: popupTitle, message }));
  } else {
    iziToast.error({ title: popupTitle, message: defaultErrorMessage });
  }
}

/**
 * Extracts the message from the given fault.
 * @param {any} fault - the fault to parse
 * @return {Promise} The promise to get the message.
 */
function extractMessage(fault) {
  let message = defaultErrorMessage;

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
 * @param {string} text - The text to parse.
 * @return {string} A detailed message or an empty string.
 */
function getExceptionMessage(text) {
  try {
    let exceptionObject = JSON.parse(text);
    if (exceptionObject) {
      return exceptionObject.ExceptionMessage || exceptionObject.Message || exceptionObject.message || '';
    }
  } catch (e) {
    return text;
  }
  return text;
}
