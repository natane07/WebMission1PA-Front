import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ShopService {

  constructor(httpClient) {
    this._http = httpClient;
  }

  addArticleToCart(userId, articleId) {
    return this._http
      .fetch(`/user/${userId}/article/${articleId}/add`, {
        method: 'put'
      })
      .then(res => res.json());
  }

  removeArticleFromCart(userId, articleId) {
    return this._http
      .fetch(`/user/${userId}/article/${articleId}/delete`, {
        method: 'put'
      })
      .then(res => res.json());
  }

  getArticleInCart(userId) {
    return this._http.fetch(`/user/${userId}/panier`).then(res => res.json());
  }

  validateCart(userId) {
    return this._http
      .fetch(`/user/${userId}/panier/validate`, {
        method: 'put'
      })
      .then(res => res.json());
  }

}
