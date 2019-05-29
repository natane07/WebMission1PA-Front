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

  constructor(articleService) {
    this._articleService = articleService;
    this.toArticles();
  }

  activate() {
    this._articleService
      .getStoredArticles()
      .then(res => (this.articles = res.article));
  }

  viewDetails(articleId) {
    this.status = VIEWMAP.details;
    this._articleService.getArticle(articleId).then(res => {
      this.article = res;
      this.title = this.article.product_name;
    });
  }

  viewCart() {}

  toArticles() {
    this.status = VIEWMAP.articles;
    this.title = 'Choose your products!';
  }

}
