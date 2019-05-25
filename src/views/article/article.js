import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';

@inject(ArticleService)
export class Article {

  constructor(articleService) {
    this._articleService = articleService;
  }

  activate(params) {
    this._articleService.getArticle(params.id).then(res => (this.article = res));
  }

}
