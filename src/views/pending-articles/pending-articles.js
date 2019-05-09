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
      .getArticles()
      .then(res => (this.articles = res.article));
  }

  createCategory() {
    return this._router.navigateToRoute('create-category');
  }

}
