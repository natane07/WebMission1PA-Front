import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';
import { Router } from 'aurelia-router';
import { SITEMAP } from 'config/app-config';

@inject(ArticleService, Router)
export class Article {

  constructor(articleService, router) {
    this._articleService = articleService;
    this._router = router;
  }

  activate(params) {
    this._articleService.getArticle(params.id).then(res => (this.article = res));
  }

  backToArticles() {
    return this._router.navigateToRoute(SITEMAP.stock);
  }

}
