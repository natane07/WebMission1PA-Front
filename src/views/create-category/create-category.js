import { inject, computedFrom } from 'aurelia-framework';
import { ArticleService } from '../../services/article-service';
import { I18N } from 'aurelia-i18n';
import {
  ValidationRules,
  ValidationControllerFactory
} from 'aurelia-validation';

@inject(ArticleService, ValidationControllerFactory, I18N)
export class CreateCategory {

  _category = '';
  stock = 0;
  categories;
  similarCategories = [];

  constructor(articleService, controllerFactory, i18n) {
    this._articleService = articleService;
    this.controller = controllerFactory.createForCurrentScope();
    this.i18n = i18n;
    this.setValidationRules();
    console.log(this.controller.errors);
  }

  activate() {
    this._articleService
      .getCategories()
      .then(res => (this.categories = res.categorie));
  }

  set category(value) {
    console.log(this.controller.errors);
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

  save() {}

}
