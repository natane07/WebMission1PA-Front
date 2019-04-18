import { inject } from 'aurelia-framework';
import { Connection } from 'plugin/connection';
import { Router } from 'aurelia-router';
import { SITEMAP } from '../../config/app-config';

@inject(Connection, Router)
export class Header {

  constructor(connection, router) {
    this.connection = connection;
    this._router = router;
  }

  goToSettings() {
    this._router.navigateToRoute(SITEMAP.settings);
  }

}
