import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class TransporterService {

  /**
   * Creates an instance of the class with the specified parameters.
   * @param {HttpClient} client - the fetch http client
   */

  constructor(client) {
    this._httpClient = client;
    this.url = '/transport';
  }

  getTransporters() {
    return this._httpClient.fetch(this.url).then(response => response.json());
  }

}
