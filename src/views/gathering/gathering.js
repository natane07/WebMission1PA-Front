import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';
import { CollecteService } from 'services/collecte-service';
import { UserSettings } from 'models/user-settings';
import { Toastr } from 'core/toastr';
import { I18N } from 'aurelia-i18n';
import { Router } from 'aurelia-router';
import { SITEMAP } from 'config/app-config';

@inject(ArticleService, CollecteService, UserSettings, Toastr, I18N, Router)
export class Gathering {

  gathering = { data: {}};

  constructor(
    articleService,
    collecteService,
    userSettings,
    toastr,
    i18n,
    router
  ) {
    this._articleService = articleService;
    this._collecteService = collecteService;
    this.userSettings = userSettings;
    this._toastr = toastr;
    this._i18n = i18n;
    this._router = router;
  }

  activate() {
    this._articleService
      .getValidatedArticles()
      .then(res => this.setArticles(res.article));
    this._collecteService
      .getStorages()
      .then(res => (this.storages = res.adresseStockage));
    this._collecteService
      .getCollectes()
      .then(res => (this.gatherings = res.collectes));
  }

  addGathering() {
    return this._router.navigateToRoute(SITEMAP.createGathering);
  }

  setArticles(articles) {
    this.articles = articles;
    this.validatedArticles = [];
  }

  validateGathering() {
    if (!this.gathering.data.id_addresse_stockage || !this.gathering.id) {
      return this._toastr.error(this._i18n.tr('gathering.nocollecte'));
    }
    this.gathering.data.articles = this.validatedArticles.map(a => a.id);
    return this._collecteService
      .validateCollecte(this.gathering.id, this.gathering.data)
      .then(() => this._collecteService.getCollectes())
      .then(res => {
        this.gatherings = res.collectes;
        return this._articleService.getValidatedArticles();
      })
      .then(res => this.setArticles(res.article));
  }

}
