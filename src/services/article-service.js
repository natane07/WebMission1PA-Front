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
    return this._httpClient.fetch(`${this.url}/attenteValidationRecolte`).then(response => response.json());
  }

  getCategories() {
    return this._httpClient.fetch(`${this.url}/categories`).then(response => response.json());
  }

  postCategory(category) {
    return this._httpClient.fetch(`${this.url}/createCategorie`, {
      method: 'post',
      body: JSON.stringify(category)
    }).then(response => response.json());
  }

}
