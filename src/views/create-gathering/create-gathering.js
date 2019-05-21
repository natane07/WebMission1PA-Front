import { inject } from 'aurelia-framework';
import { TransporterService } from 'services/transporter-service';
import { CollecteService } from 'services/collecte-service';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import {
  ValidationRules,
  ValidationControllerFactory,
  Validator
} from 'aurelia-validation';
import { SITEMAP } from 'config/app-config';

@inject(TransporterService, CollecteService, ValidationControllerFactory, Validator, I18N, Router)
export class CreateGathering {

  name = '';
  transporter = null;
  canSave = false;

  constructor(transporterService, collecteService, controllerFactory, validator, i18n, router) {
    this._transporterService = transporterService;
    this._collecteService = collecteService;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.subscribe(() => this.validate());
    this.validator = validator;
    this.i18n = i18n;
    this._router = router;
    this.setValidationRules();
    this.validate();
  }

  activate() {
    this._transporterService
      .getTransporters()
      .then(res => (this.transporters = res.data));
  }

  setValidationRules() {
    ValidationRules.ensure('name')
      .required()
      .withMessage(`${this.i18n.tr('create-gathering.name')} ${this.i18n.tr('errors.required')}`)
      .minLength(3)
      .withMessage(`${this.i18n.tr('create-gathering.name')} ${this.i18n.tr('errors.minLength')}`)
      .maxLength(50)
      .withMessage(`${this.i18n.tr('create-gathering.name')} ${this.i18n.tr('errors.maxLength')}`)
      .ensure('transporter')
      .required()
      .withMessage(`${this.i18n.tr('create-gathering.transporter')} ${this.i18n.tr('errors.required')}`)
      .on(CreateGathering);
  }

  save() {
    return this._collecteService
      .postCollecte({
        data: { name: this.name, id_USER_TRANSPORTER: this.transporter }
      })
      .then(() => this._router.navigateToRoute(SITEMAP.gathering));
  }

  validate() {
    this.validator
      .validateObject(this)
      .then(results => (this.canSave = results.every(result => result.valid)));
  }

}
