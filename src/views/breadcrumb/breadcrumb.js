import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';

@inject(Router)
export class Breadcrumb {

  constructor(router) {
    this._router = router;
    this.getRoutes();
  }

  getRoutes() {
    this.routes = this._router.navigation
      .filter(nav => nav.settings.breadcrumb)
      .sort((nav1, nav2) => nav1.settings.order - nav2.settings.order);
  }

}
