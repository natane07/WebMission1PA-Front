import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';

@inject(ArticleService)
export class Stock {

  constructor(articleService) {
    this._articleService = articleService;
  }

  articles = [];
  categories = [];
  isSorted = false;

  activate() {
    this._articleService
      .getStoredArticles()
      .then(res => this.setArticles(res.article));
    this._articleService
      .getCategories()
      .then(res => (this.categories = res.categorie));
  }

  setArticles(res) {
    this.articles = res;
    this._articles = this.articles;
  }

  sortArticles() {
    if (!this.isSorted) {
      this.isSorted = true;
      this.articles = [];
      let IdCategories = new Set(this._articles.map(a => a.id_CATEGORIES));
      IdCategories.forEach(id => {
        let categoryArticles = [];
        this._articles
          .filter(a => a.id_CATEGORIES === id)
          .reduce((map, article) => {
            let value = map.get(article.product_name);
            return map.set(article.product_name, {
              ...article,
              amount: (value && value.amount ? value.amount : 0) + 1
            });
          }, new Map())
          .forEach(e => categoryArticles.push(e));
        let category = this.categories.find(c => c.id === id).type_article;
        this.articles.push({
          category: category,
          articles: categoryArticles
        });
      });
    }
  }

  unsortArticles() {
    this.articles = this._articles;
    this.isSorted = false;
  }

}
