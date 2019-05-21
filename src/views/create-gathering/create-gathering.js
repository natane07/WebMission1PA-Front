import { inject, computedFrom } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import {
  ValidationRules,
  ValidationControllerFactory,
  Validator
} from 'aurelia-validation';
import { SITEMAP } from 'config/app-config';

@inject(ArticleService, ValidationControllerFactory, Validator, I18N, Router, )
export class CreateCategory {

  _category = '';
  stock = 0;
  categories;
  similarCategories = [];
  canSave = false;

  constructor(articleService, controllerFactory, validator, i18n, router) {
    this._articleService = articleService;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.subscribe(() => this.validate());
    this.validator = validator;
    this.i18n = i18n;
    this._router = router;
    this.setValidationRules();
    this.validate();
  }

  activate() {
    this._articleService
      .getCategories()
      .then(res => (this.categories = res.categorie));
  }

  set category(value) {
    this._category = value;
    this.similarCategories = this.categories.filter(e => e.type_article.toLowerCase().startsWith(value.toLowerCase()));
  }

  @computedFrom('_category')
  get category() {
    return this._category;
  }

  setValidationRules() {
    ValidationRules.ensure('category')
      .required()
      .withMessage(`${this.i18n.tr('category.name')} ${this.i18n.tr('errors.required')}`)
      .minLength(3)
      .withMessage(`${this.i18n.tr('category.name')} ${this.i18n.tr('errors.minLength')}`)
      .maxLength(50)
      .withMessage(`${this.i18n.tr('category.name')} ${this.i18n.tr('errors.maxLength')}`)
      .ensure('stock')
      .required()
      .withMessage(`${this.i18n.tr('category.maxAmount')} ${this.i18n.tr('errors.required')}`)
      .satisfies(obj => !isNaN(obj))
      .withMessage(`${this.i18n.tr('category.maxAmount')} ${this.i18n.tr('errors.nan')}`)
      .on(CreateCategory);
  }

  save() {
    return this._articleService
      .postCategory({
        categorie: { type_article: this.category, stockage_max: this.stock }
      })
      .then(() => this._router.navigateToRoute(SITEMAP.pendingArticles));
  }

  validate() {
    this.validator
      .validateObject(this)
      .then(results => (this.canSave = results.every(result => result.valid)));
  }

}
