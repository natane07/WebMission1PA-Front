import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class DeliveryService {

  constructor(httpClient) {
    this._http = httpClient;
  }

  getUsers() {
    return this._http.fetch('/article/attente/distribution').then(res => res.json());
  }

  getDeliveries() {
    return this._http.fetch('/distribution').then(res => res.json());
  }

  postDelivery(data) {
    return this._http
      .fetch('/distribution', {
        method: 'post',
        body: JSON.stringify(data)
      })
      .then(response => response.json());
  }

  validateDelivery(id, data) {
    return this._http
      .fetch(`/distribution/${id}`, {
        method: 'put',
        body: JSON.stringify(data)
      })
      .then(response => response.json());
  }

}
