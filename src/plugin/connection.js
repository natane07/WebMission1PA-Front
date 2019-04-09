import { inject, computedFrom } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { UserManager, Log } from 'oidc-client';
import { getCurrentRouteInfo } from 'plugin/constants';
import { UserPrompt } from 'plugin/user-prompt';

/**
 * Provides an encapsulation of the OpenID Connect user connection.
 */
@inject(Router, UserManager, UserPrompt)
export class Connection {

  /**
   * Creates an instance of the class with the given parameter.
   * @param {Router} router - the aurelia router
   * @param {UserManager} userManager - the openid user manager
   * @param {UserPrompt} userPrompt - the user prompt to confirm reconnection
   */
  constructor(router, userManager, userPrompt) {
    this.user = null;
    this._router = router;
    this._userManager = userManager;
    this.observeUser(user => this.setUser(user));
    this._reconnectPrompt = userPrompt.reconnectPrompt;
  }

  /**
   * Defines a callback called when user connection changes.
   * @param {function} userfunc - a callback called when user connection changes
   */
  observeUser(userfunc) {
    this._userManager.events.addUserLoaded(user => userfunc(user));
    this._userManager.events.addUserUnloaded(user => userfunc(user));
    this._userManager.getUser().then(user => userfunc(user));
  }

  /**
   * Initiates the OpenID Connect user connection.
   * @param {string} route - the aurelia route name that initiates the user connection
   */
  async loginUser(route) {
    const redirectRoute = route || getCurrentRouteInfo(this._router.currentInstruction);
    try {
      Log.info(`Connection.loginUser: starting signin redirection with ${redirectRoute}...`);
      await this._userManager.signinRedirect({ state: redirectRoute });
    } catch (error) {
      Log.error('Unable to login', error);
    }
  }

  /**
   * Initiates the OpenID Connect user deconnection.
   * @param {string} route - the aurelia route name that initiates the user deconnection
   */
  async logoutUser(route) {
    const redirectRoute = route || getCurrentRouteInfo(this._router.currentInstruction);
    try {
      Log.info(`Connection.logoutUser: starting signout redirection with ${redirectRoute}...`);
      await this._userManager.signoutRedirect({ state: redirectRoute });
    } catch (error) {
      Log.error('Unable to logout', error);
    }
  }

  /**
   * Initiates the OpenID Connect silent user connection.
   * @param {string} route - the aurelia route name that initiates the silent user connection
   */
  async trySilentLogin(route) {
    const redirectRoute = route || getCurrentRouteInfo(this._router.currentInstruction);
    try {
      Log.info(`Connection.trySilentLogin: starting silent signin redirection with ${redirectRoute}...`);
      await this._userManager.signinSilent({ state: redirectRoute });
    } catch (error) {
      Log.warn(`Connection.trySilentLogin: silent signin error: ${error}`);
      if (error.error === 'interaction_required') {
        this._reconnectPrompt(() => this.loginUser(redirectRoute));
      } else {
        Log.error('Unable to login silently', error);
      }
    }
  }

  /**
   * Sets the connected user entity.
   * @param {User} user - the OpenID Connect user
   */
  setUser(user) {
    this.user = user;
  }

  /**
   * Is the user currently connected?
   */
  @computedFrom('user')
  get isUserLoggedIn() {
    return this.user !== null;
  }

  /**
   * Has the user a valid access token?
   */
  @computedFrom('user')
  get hasValidAccessToken() {
    return this.user !== null && this.user.access_token && !this.user.expired;
  }

  /**
   * The user access token.
   * @description The token may be expired. Use the @see hasValidAccessToken property to check before.
   */
  @computedFrom('user')
  get accessToken() {
    // eslint-disable-next-line camelcase
    return this.user?.access_token;
  }

  /**
   * The display name of the user.
   * @description A combination of firstname / last name.
   */
  @computedFrom('user')
  get userName() {
    const profile = this.user?.profile;
    // eslint-disable-next-line camelcase
    const firstName = profile?.given_name || '';
    // eslint-disable-next-line camelcase
    const lastName = profile?.family_name || '';
    return firstName !== '' ? `${firstName} ${lastName}` : lastName;
  }

}
