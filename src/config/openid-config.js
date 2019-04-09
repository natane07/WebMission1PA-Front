import { LogManager } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';
import { WebStorageStateStore, Log } from 'oidc-client';
import iziToast from 'izitoast';

/**
 * The open id plugin name used by the aurelia log manager.
 */
const OPENIDPLUGIN = 'OpenidPlugin';

/**
 * Implements the reconnect prompt with izitoast component.
 * @param {function} loginFunc - the function called to reconnect the session.
 */
const reconnectPrompt = loginFunc => {
  iziToast.show({
    theme: 'dark',
    title: 'Session expired',
    message: 'Your session has expired. Please reconnect.',
    position: 'center',
    buttons: [['<button>Reconnect</button>', (instance, toast) => loginFunc(), true]]
  });
};

/**
 * Configures the openid plugin
 * @param {Aurelia} aurelia - the aurelia application.
 * @return {Object} - the configuration for the openid plugin
 */
export default aurelia => {
  const configInstance = aurelia.container.get(AureliaConfiguration);
  const oauth2 = configInstance.get('authentication');
  const logger = LogManager.getLogger(OPENIDPLUGIN);
  Log.level = 3;
  Log.logger = logger;

  return {
    reconnectPrompt: reconnectPrompt,
    userManagerSettings: {
      // the number of seconds in advance of access token expiry to raise the access token expiring event.
      accessTokenExpiringNotificationTime: 60,
      // Azure B2C
      authority: `https://${oauth2.tenantName}.b2clogin.com/tfp/${oauth2.tenantName}.onmicrosoft.com/${oauth2.b2cPolicy}/v2.0`,
      client_id: oauth2.clientId,
      automaticSilentRenew: false,
      // the interval in milliseconds between checking the user's session.
      checkSessionInterval: 30000,
      filterProtocolClaims: false,
      loadUserInfo: false,
      post_logout_redirect_uri: `${oauth2.redirectHost}/signout-oidc`,
      redirect_uri: `${oauth2.redirectHost}/signin-oidc`,
      response_type: 'id_token token',
      scope: `${oauth2.apiScope} openid`,
      metadata: {
        authorization_endpoint: `https://${oauth2.tenantName}.b2clogin.com/${oauth2.tenantName}.onmicrosoft.com/${oauth2.b2cPolicy}/oauth2/v2.0/authorize`,
        jwks_uri: `${oauth2.redirectHost}/config/keys.json`,
        //jwks_uri: `https://${oauth2.tenantName}.b2clogin.com/${oauth2.tenantName}.onmicrosoft.com/${oauth2.b2cPolicy}/discovery/v2.0/keys`,
        end_session_endpoint: `https://${oauth2.tenantName}.b2clogin.com/${oauth2.tenantName}.onmicrosoft.com/${oauth2.b2cPolicy}/oauth2/v2.0/logout`,
        issuer: `https://${oauth2.tenantName}.b2clogin.com/${oauth2.tenantId}/v2.0/`
      },
      // number of milliseconds to wait for the authorization
      silentRequestTimeout: 20000,
      // server to response to silent renew request
      silent_redirect_uri: `${oauth2.redirectHost}/signin-oidc`,
      userStore: new WebStorageStateStore({
        prefix: 'oidc',
        store: window.localStorage
      })
    }
  };
};
