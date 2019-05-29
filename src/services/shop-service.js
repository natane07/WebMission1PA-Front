import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ShopService {

  constructor(httpClient) {
    this._http = httpClient;
  }

}
