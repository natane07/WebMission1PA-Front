import { inject } from 'aurelia-framework';
import { Connection } from 'plugin/connection';
import { Log } from 'oidc-client';
import { UserPrompt } from 'plugin/user-prompt';

/**
 * Implements a custom interceptor that sets OAuth2 bearer token and
 * obtain a new token when expired.
 */
@inject(Connection, UserPrompt)
export class Oauth2Interceptor {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {Connection} connection - the OpenID Connect user connection
   * @param {UserPrompt} userPrompt - the user prompt to show error
   */
  constructor(connection, userPrompt) {
    this._connection = connection;
    this._errorPrompt = userPrompt.errorPrompt;
  }

  /**
   * Intercepts and handles the request.
   * @param {RequestMessage} request - the intercepted request
   */
  async request(request) {
    try {
      if (!this._connection.hasValidAccessToken) {
        Log.info('Oauth2Interceptor.request: expired token, try silent login...');
        await this._connection.trySilentLogin();
      }
      request.headers.set('Authorization', `Bearer ${this._connection.accessToken}`);
      return request;
    } catch (error) {
      Log.error('Unable to obtain new token', error);
      return request;
    }
  }

}
