import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { AureliaConfiguration } from 'aurelia-configuration';
import { OpenidRouting } from 'plugin/openid-routing';
import { Oauth2Interceptor } from 'plugin/oauth2-interceptor';
import { APPLICATIONTITLE, SITEMAP, ROUTES } from 'config/app-config';
import { ErrorInterceptor } from 'core/error-interceptor';

/**
 * Implements the aurelia application for the kis-minutes application.
 */
@inject(OpenidRouting, AureliaConfiguration, HttpClient, Oauth2Interceptor, ErrorInterceptor)
export class App {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {OpenidRouting} openidRouting - the OpenID/Connect routing component
   * @param {AureliaConfiguration} aureliaConfiguration - the aurelia configuration api
   * @param {HttpClient} client - the fetch http client
   * @param {Oauth2Interceptor} authInterceptor - the authentication fetch interceptor
   * @param {ErrorInterceptor} errorInterceptor - the error fetch interceptor
   */
  constructor(openidRouting, aureliaConfiguration, client, authInterceptor, errorInterceptor) {
    this._openidRouting = openidRouting;
    this.httpClient = this.configureHttpClient(client, aureliaConfiguration.get('api.uri'), authInterceptor, errorInterceptor);
  }

  /**
   * Configures the application router.
   * @param {RouterConfiguration} configuration - the router configuration
   * @param {Router} router - the aurelia router
   */
  configureRouter(configuration, router) {
    configuration.title = APPLICATIONTITLE;
    configuration.options.pushState = true;
    configuration.options.root = '/';
    configuration.map(ROUTES);
    configuration.fallbackRoute(SITEMAP.home);
    this._openidRouting.configureRouter(configuration);
    this.router = router;
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
            'Access-Control-Allow-Credentials': 'true',
            'Accept': 'application/json'
          },
          credentials: 'include',
          mode: 'cors'
        })
        .rejectErrorResponses()
        .withInterceptor(authInterceptor)
        .withInterceptor(errorInterceptor);
    });
  }

}
