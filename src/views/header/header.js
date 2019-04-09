import { inject } from 'aurelia-framework';
import { Connection } from 'plugin/connection';

@inject(Connection)
export class Header {

  constructor(connection) {
    this.connection = connection;
  }

}
