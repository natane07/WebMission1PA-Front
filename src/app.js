import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AureliaConfiguration } from 'aurelia-configuration';
//import { OpenidRouting } from 'plugin/openid-routing';
//import {  } from 'plugin/oauth2-interceptor';
import { APPLICATIONTITLE, SITEMAP, ROUTES } from 'config/app-config';
import { ErrorInterceptor } from 'core/error-interceptor';
import { UserSettings } from './models/user-settings';

import { OpenidRouting, Connection, Oauth2Interceptor } from 'aurelia-kis-oidc';

/**
 * Implements the aurelia application for the kis-minutes application.
 */
@inject(
  OpenidRouting,
  AureliaConfiguration,
  HttpClient,
  Oauth2Interceptor,
  ErrorInterceptor,
  UserSettings,
  Connection
)
export class App {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {OpenidRouting} openidRouting - the OpenID/Connect routing component
   * @param {AureliaConfiguration} aureliaConfiguration - the aurelia configuration api
   * @param {HttpClient} client - the fetch http client
   * @param {Oauth2Interceptor} authInterceptor - the authentication fetch interceptor
   * @param {ErrorInterceptor} errorInterceptor - the error fetch interceptor
   * @param {UserSettings} userSettings - the user options to fetch
   * @param {Connection} connection - the user options to fetch
   */
  constructor(
    openidRouting,
    aureliaConfiguration,
    client,
    authInterceptor,
    errorInterceptor,
    userSettings,
    connection
  ) {
    this._openidRouting = openidRouting;
    this.httpClient = this.configureHttpClient(
      client,
      aureliaConfiguration.get('api.uri'),
      authInterceptor,
      errorInterceptor
    );
    this.userSettings = userSettings;
    this.connection = connection;
  }

  async activate() {
    await this.userSettings.load();
  }

  /**
   * Configures the application router.
   * @param {RouterConfiguration} configuration - the router configuration
   * @param {Router} router - the aurelia router
   */
  configureRouter(configuration, router) {
    this.router = router;
    configuration.title = APPLICATIONTITLE;
    configuration.options.pushState = true;
    configuration.options.root = '/';
    configuration.map(ROUTES);
    configuration.fallbackRoute(SITEMAP.home);
    this._openidRouting.configureRouter(configuration);
  }

  /**
   * Configures the fetch client for oauth2, cors, json with the correct root api uri.
   * @param {HttpClient} client - the fetch http client
   * @param {string} apiUri - the root api uri
   * @param {Interceptor} authInterceptor - the authentication fetch interceptor
   * @param {ErrorInterceptor} errorInterceptor - the error fetch interceptor
   * @return {HttpClient} the fetch http client
   */
  configureHttpClient(client, apiUri, authInterceptor, errorInterceptor) {
    return client.configure(config => {
      config
        .withBaseUrl(apiUri)
        .withDefaults({
          headers: {
            // 'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json'
          },
          // credentials: 'include',
          mode: 'cors'
        })
        .rejectErrorResponses()
        .withInterceptor(authInterceptor)
        .withInterceptor(errorInterceptor);
    });
  }

}
