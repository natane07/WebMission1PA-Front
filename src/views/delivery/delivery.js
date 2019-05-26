import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DeliveryService } from 'services/delivery-service';
import { UserSettings } from 'models/user-settings';
import { I18N } from 'aurelia-i18n';
import { SITEMAP } from 'config/app-config';

@inject(Router, DeliveryService, UserSettings, I18N)
export class Delivery {

  delivery = {};
  validatedUsers = [];

  constructor(router, deliveryService, userSettings, i18n) {
    this._router = router;
    this._deliveryService = deliveryService;
    this.userSettings = userSettings;
    this._i18n = i18n;
  }

  activate() {
    this._deliveryService
      .getDeliveries()
      .then(res => (this.deliveries = res.distributions));
    this._deliveryService.getUsers().then(res => (this.users = res.users));
  }

  createDelivery() {
    return this._router.navigateToRoute(SITEMAP.createDelivery);
  }

}
