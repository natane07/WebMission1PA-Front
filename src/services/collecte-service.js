import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class CollecteService {

  constructor(httpClient) {
    this._http = httpClient;
  }

  getStorages() {
    return this._http.fetch('/adresse/stockage').then(res => res.json());
  }

  getCollectes() {
    return this._http.fetch('/collecte').then(res => res.json());
  }

  validateCollecte(id, data) {
    return this._http
      .fetch(`/collecte/${id}`, {
        method: 'put',
        body: JSON.stringify(data)
      })
      .then(response => response.json());
  }

}
