import { inject } from 'aurelia-framework';
import { ArticleService } from './../../services/article-service';
import { Router } from 'aurelia-router';

@inject(ArticleService, Router)
export class PendingArticles {

  constructor(articleService, router) {
    this._articleService = articleService;
    this._router = router;
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
