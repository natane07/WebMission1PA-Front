import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';

const VIEWMAP = {
  articles: 0,
  details: 1,
  cart: 2
};

@inject(ArticleService)
export class Shop {

  viewMap = VIEWMAP;
  status = VIEWMAP.articles;

  constructor(articleService) {
    this._articleService = articleService;
  }

  activate() {
    this._articleService
      .getStoredArticles()
      .then(res => (this.articles = res.article));
  }

  viewDetails(articleId) {
    this.status = VIEWMAP.details;
    this._articleService
      .getArticle(articleId)
      .then(res => (this.article = res));
  }

  backToArticles() {
    this.status = VIEWMAP.articles;
  }

}
