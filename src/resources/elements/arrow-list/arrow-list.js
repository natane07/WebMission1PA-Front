import { bindable } from 'aurelia-framework';

export class ArrowListCustomElement {

  @bindable source = [];
  @bindable destination = [];
  selectedItem = null;

  select(item) {
    this.selectedItem = item;
  }

}
