import { inject } from 'aurelia-framework';
import { ArticleService } from './../../services/article-service';

@inject(ArticleService)
export class PendingArticles {

  constructor(articleService) {
    this._articleService = articleService;
  }

  activate() {
    this._articleService.getArticles().then(res => (this.articles = res));
  }

}
