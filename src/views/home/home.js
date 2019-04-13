import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Connection } from 'plugin/connection';
import { APPLICATIONTITLE, SITEMAP } from 'config/app-config';

@inject(Router, Connection)
export class Home {

  constructor(router, connection) {
    this._router = router;
    this.connection = connection;
    this.appTitle = APPLICATIONTITLE;
  }

  manage() {
    this._router.navigateToRoute(SITEMAP.pendingArticles);
  }

}
