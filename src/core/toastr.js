import iziToast from 'izitoast';

/**
 * The popup service that displays transient messages.
 */
export class Toastr {

  /**
   * Popups an information message.
   * @param {string} message - The message to show.
   */
  info(message) {
    iziToast.info({ message });
  }

  /**
   * Popups a warning message.
   * @param {string} message - The message to show.
   */
  warning(message) {
    iziToast.warning({ message });
  }

  /**
   * Popups an error message.
   * @param {string} message - The message to show.
   */
  error(message) {
    iziToast.errors({ message });
  }

}
