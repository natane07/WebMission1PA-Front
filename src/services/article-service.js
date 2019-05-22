import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ArticleService {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {HttpClient} client - the fetch http client
   */

  constructor(client) {
    this._httpClient = client;
    this.url = '/article';
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

  getStoredArticles() {
    return this._httpClient
      .fetch(`${this.url}/stock`)
      .then(response => response.json());
  }

}
