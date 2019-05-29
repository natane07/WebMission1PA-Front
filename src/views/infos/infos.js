import { inject } from 'aurelia-framework';
import { UserService } from 'services/user-service';
import { Router } from 'aurelia-router';
import {
  ValidationRules,
  ValidationControllerFactory,
  Validator
} from 'aurelia-validation';
import { Connection } from 'plugin/connection';
import { SITEMAP } from 'config/app-config';

@inject(UserService, ValidationControllerFactory, Validator, Router, Connection)
export class InfosView {

  name = '';
  lastname = '';
  zipcode = '';
  address = '';
  phone = '';
  type = null;
  userTypes = [];
  canSave = false;

  constructor(userService, controllerFactory, validator, router, connection) {
    this._userService = userService;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.subscribe(() => this.validate());
    this.validator = validator;
    this._router = router;
    this.connection = connection;
    this.setValidationRules();
    this.validate();
  }

  activate() {
    this._userService
      .getUserInfos(this.connection.email)
      .then(res => (this.user = res));
    this._userService
      .getUserTypes()
      .then(res => (this.userTypes = res.type.filter(t => t.id === 2 || t.id === 3)));
  }

  setValidationRules() {
    ValidationRules.ensure('name')
      .required()
      .minLength(3)
      .maxLength(50)
      .ensure('lastname')
      .required()
      .minLength(3)
      .maxLength(50)
      .ensure('type')
      .required()
      .ensure('zipcode')
      .required()
      .minLength(5)
      .maxLength(5)
      .ensure('phone')
      .required()
      .minLength(3)
      .maxLength(50)
      .ensure('address')
      .required()
      .minLength(3)
      .maxLength(200)
      .on(InfosView);
  }

  save() {
    const object = {
      name: this.name,
      lastname: this.lastname,
      id_TYPE_USER: this.type,
      address: this.address,
      zipcode: this.zipcode,
      phone: this.phone
    };
    return this._userService
      .postInfos(this.user.userId, object)
      .then(() => this._router.navigateToRoute(SITEMAP.home));
  }

  validate() {
    this.validator
      .validateObject(this)
      .then(results => (this.canSave = results.every(result => result.valid)));
  }

}
