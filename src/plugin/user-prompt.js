import { defaultReconnectPrompt } from 'plugin/constants';

/**
 * The user prompt service of the plugin.
 */
export class UserPrompt {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {function} reconnectPrompt - the reconnect user prompt
   */
  constructor(reconnectPrompt) {
    this.reconnectPrompt = reconnectPrompt || defaultReconnectPrompt;
  }

}
