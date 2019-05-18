import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';

@inject(ArticleService)
export class Gathering {

  constructor(articleService) {
    this._articleService = articleService;
  }

  activate() {
    this._articleService
      .getValidatedArticles()
      .then(res => this.setArticles(res.article));
  }

  setArticles(articles) {
    this.articles = articles;
    this.articleNames = articles.map(a => a.product_name);
  }

}
