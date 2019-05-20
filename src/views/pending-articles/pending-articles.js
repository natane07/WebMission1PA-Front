import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';
import { Router } from 'aurelia-router';
import { I18N } from 'aurelia-i18n';
import { Toastr } from 'core/toastr';

@inject(ArticleService, Router, I18N, Toastr)
export class PendingArticles {

  constructor(articleService, router, i18n, toastr) {
    this._articleService = articleService;
    this._router = router;
    this._i18n = i18n;
    this._toastr = toastr;
  }

  activate() {
    this._articleService
      .getCategories()
      .then(res => {
        this.categories = res.categorie;
        return this._articleService.getArticles();
      })
      .then(res => (this.articles = res.article));
  }

  createCategory() {
    return this._router.navigateToRoute('create-category');
  }

  validateArticle(article) {
    if (!article.category) {
      return this._toastr.error(this._i18n.tr('articles.nocategory'));
    }
    this._articleService
      .validateArticle(article)
      .then(() => this._articleService.getArticles())
      .then(res => (this.articles = res.article));
  }

  rejectArticle(article) {
    this._articleService
      .rejectArticle(article)
      .then(() => this._articleService.getArticles())
      .then(res => (this.articles = res.article));
  }

}
