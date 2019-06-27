import { inject } from 'aurelia-framework';
import { Connection } from 'aurelia-kis-oidc';
import { Router } from 'aurelia-router';
import { SITEMAP } from 'config/app-config';

@inject(Connection, Router)
export class Header {

  constructor(connection, router) {
    this.connection = connection;
    this._router = router;
  }

  goToSettings() {
    this._router.navigateToRoute(SITEMAP.settings);
  }

  /**
   * Navigates back to home and disconnect the user.
   * @return {Promise} the promise to the user disconnection routine
   */
  async logout() {
    // go back to home to avoid reconnect prompt
    await this._router.navigateToRoute(SITEMAP.home);
    return this.connection.logoutUser();
  }

}
