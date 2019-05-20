import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';
import { CollecteService } from 'services/collecte-service';
import { UserSettings } from 'models/user-settings';

@inject(ArticleService, CollecteService, UserSettings)
export class Gathering {

  gathering = { data: {}};

  constructor(articleService, collecteService, userSettings) {
    this._articleService = articleService;
    this._collecteService = collecteService;
    this.userSettings = userSettings;
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

  setArticles(articles) {
    this.articles = articles;
    this.articleNames = articles.map(a => a.product_name);
    this.validatedArticles = [];
  }

  validateGathering() {
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
