import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
/**
 * Implements the service that encapsulates the kis-minute web api.
 */
@inject(HttpClient)
export class ArticleService {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {HttpClient} client - the fetch http client
   */

  constructor(client) {
    this._httpClient = client;
    this.url = '/article/attenteValidationRecolte';
  }

  getArticles() {
    return this._httpClient.fetch(this.url).then(response => response.json());
  }

}
