import { LogManager } from 'aurelia-framework';
import { AureliaConfiguration } from 'aurelia-configuration';
import { WebStorageStateStore, Log } from 'oidc-client';
import iziToast from 'izitoast';
import { I18N } from 'aurelia-i18n';
import { SITEMAP } from 'config/app-config';

/**
 * The open id plugin name used by the aurelia log manager.
 */
const OPENIDPLUGIN = 'OpenidPlugin';

/**
 * Implements the reconnect prompt with izitoast component.
 * @param {I18N} i18n -  the translation plugin
 * @return {function} the function called to reconnect the session
 */
const reconnectPrompt = i18n => loginFunc => {
  iziToast.show({
    theme: 'dark',
    title: 'Session expired',
    message: 'Your session has expired. Please reconnect.',
    position: 'center',
    buttons: [
      ['<button>Reconnect</button>', (instance, toast) => loginFunc(), true]
    ]
  });
};

const redirectsOnClaim = profile => {
  if (profile.newUser) return SITEMAP.settings;
};

const userIdClaimSelector = profile => profile.emails[0];

/**
 * Configures the openid plugin
 * @param {Aurelia} aurelia - the aurelia application.
 * @return {Object} - the configuration for the openid plugin
 */
export default aurelia => {
  const i18n = aurelia.container.get(I18N);
  const configInstance = aurelia.container.get(AureliaConfiguration);
  const auth = configInstance.get('authentication');
  const logger = LogManager.getLogger(OPENIDPLUGIN);
  Log.level = 3;
  Log.logger = logger;

  return {
    simulation: auth.enable === false,
    simulationUser: {
      profile: { name: 'V.CARITEY(dbg)', emails: ['vincent.caritey@free.fr']},
      expired: false,
      access_token: '12345'
    },
    userIdClaimSelector: userIdClaimSelector,
    redirectsOnClaim: redirectsOnClaim,
    reconnectPrompt: reconnectPrompt(i18n),
    userManagerSettings: {
      // the number of seconds in advance of access token expiry to raise the access token expiring event.
      accessTokenExpiringNotificationTime: 60,
      // Azure B2C
      authority: auth.identityUrl,
      client_id: auth.clientId,
      automaticSilentRenew: false,
      // the interval in milliseconds between checking the user's session.
      checkSessionInterval: 30000,
      filterProtocolClaims: false,
      loadUserInfo: false,
      post_logout_redirect_uri: `${auth.redirectHost}/signout-oidc`,
      redirect_uri: `${auth.redirectHost}/signin-oidc`,
      response_type: 'id_token token',
      scope: `${auth.apiScope} openid`,
      // number of milliseconds to wait for the authorization
      silentRequestTimeout: 20000,
      // server to response to silent renew request
      silent_redirect_uri: `${auth.redirectHost}/signin-oidc`,
      userStore: new WebStorageStateStore({
        prefix: 'oidc',
        store: window.localStorage
      })
    }
  };
};
