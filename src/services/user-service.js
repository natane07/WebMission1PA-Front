import { inject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class UserService {

  constructor(httpClient) {
    this._http = httpClient;
  }

  async getUserInfos(email) {
    let encodedEmail = btoa(email);
    return this._http
      .fetch(`/user/email/${encodedEmail}`)
      .then(response => response.json());
  }

  async getUserTypes() {
    return this._http.fetch('/user/type').then(response => response.json());
  }

  async postInfos(idUser, infos) {
    return this._http
      .fetch(`/user/${idUser}/addresse`, {
        method: 'post',
        body: JSON.stringify(infos)
      })
      .then(response => response.json());
  }

}
