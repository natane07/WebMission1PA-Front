import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';

@inject(ArticleService)
export class Gathering {

  articles = ['toto'];

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
    console.log(articles);
  }

}
