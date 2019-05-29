import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { DeliveryService } from 'services/delivery-service';
import { UserSettings } from 'models/user-settings';
import { I18N } from 'aurelia-i18n';
import { SITEMAP } from 'config/app-config';
import { Toastr } from 'core/toastr';

@inject(Router, DeliveryService, UserSettings, I18N, Toastr)
export class Delivery {

  delivery = { data: {}};
  validatedUsers = [];

  constructor(router, deliveryService, userSettings, i18n, toastr) {
    this._router = router;
    this._deliveryService = deliveryService;
    this.userSettings = userSettings;
    this._i18n = i18n;
    this._toastr = toastr;
  }

  activate() {
    this._deliveryService
      .getDeliveries()
      .then(res => (this.deliveries = res.distributions));
    this._deliveryService.getUsers().then(res => this.setUsers(res.users));
  }

  setUsers(res) {
    this.users = res;
    this.validatedUsers = [];
  }

  createDelivery() {
    return this._router.navigateToRoute(SITEMAP.createDelivery);
  }

  validateDelivery() {
    if (!this.delivery.id) {
      return this._toastr.error(this._i18n.tr('delivery.nodelivery'));
    }
    this.delivery.data.users = this.validatedUsers.map(a => a.id_USER_ADD_TO_CART);
    return this._deliveryService
      .validateDelivery(this.delivery.id, this.delivery.data)
      .then(() => this._deliveryService.getDeliveries())
      .then(res => {
        this.deliveries = res.distributions;
        return this._deliveryService.getUsers();
      })
      .then(res => this.setUsers(res.users));
  }

}
