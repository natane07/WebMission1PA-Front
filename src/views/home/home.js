import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Connection } from 'aurelia-kis-oidc';
import { APPLICATIONTITLE, SITEMAP } from 'config/app-config';
import { UserService } from 'services/user-service';

@inject(Router, Connection, UserService)
export class Home {

  constructor(router, connection, userService) {
    this._router = router;
    this.connection = connection;
    this.appTitle = APPLICATIONTITLE;
    this._userService = userService;
  }

  manage() {
    this._userService.getUserInfos(this.connection.user.profile.emails[0]).then(res => {
      switch (res.code) {
        case 0:
          return this._router.navigateToRoute(SITEMAP.shop);
        case 1:
          return this._router.navigateToRoute(SITEMAP.infos);
        case 2:
          return this._router.navigateToRoute(SITEMAP.pendingArticles);
        default:
          break;
      }
    });
  }

}
