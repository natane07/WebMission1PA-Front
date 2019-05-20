import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Toastr } from 'core/toastr';
import { I18N } from 'aurelia-i18n';

@inject(HttpClient, Toastr, I18N)
export class ArticleService {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {HttpClient} client - the fetch http client
   */

  constructor(client, toastr, i18n) {
    this._httpClient = client;
    this.url = '/article';
    this._toastr = toastr;
    this._i18n = i18n;
  }

  getArticles() {
    return this._httpClient
      .fetch(`${this.url}/attente/recolte/validation`)
      .then(response => response.json());
  }

  getCategories() {
    return this._httpClient
      .fetch(`${this.url}/categories`)
      .then(response => response.json());
  }

  postCategory(category) {
    return this._httpClient
      .fetch(`${this.url}/categorie`, {
        method: 'post',
        body: JSON.stringify(category)
      })
      .then(response => response.json());
  }

  validateArticle(article) {
    if (!article.category) {
      return this._toastr.error(this._i18n.tr('articles.nocategory'));
    }
    return this._httpClient
      .fetch(`${this.url}/validate`, {
        method: 'post',
        body: JSON.stringify({
          article: { id: article.id, id_CATEGORIES: article.category }
        })
      })
      .then(response => response.json());
  }

  rejectArticle(article) {
    return this._httpClient
      .fetch(`${this.url}/decline`, {
        method: 'post',
        body: JSON.stringify({
          article: { id: article.id }
        })
      })
      .then(response => response.json());
  }

  getValidatedArticles() {
    return this._httpClient
      .fetch(`${this.url}/attente/recolte`)
      .then(response => response.json());
  }

}
