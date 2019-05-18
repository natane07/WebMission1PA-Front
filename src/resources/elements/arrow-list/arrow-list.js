import { bindable, inject } from 'aurelia-framework';
import { BindingSignaler } from 'aurelia-templating-resources';

@inject(BindingSignaler)
export class ArrowListCustomElement {

  @bindable source = [];
  @bindable destination = [];
  selectedItem = null;

  constructor(bindingSignaler) {
    this.signaler = bindingSignaler;
  }

  select(index, slot) {
    this.selectedItem = { index: index, slot: slot };
    this.signaler.signal('signal');
  }

  isSelected(index, slot) {
    if (!this.selectedItem) {
      return false;
    }
    return (
      this.selectedItem.index === index && this.selectedItem.slot === slot
    );
  }

  canMove(destination) {
    return this.selectedItem && this.selectedItem.slot !== destination;
  }

  move(source, destination) {
    if (this.canMove(destination)) {
      destination.push(this.selectedItem.slot[this.selectedItem.index]);
      source.splice(this.selectedItem.index, 1);
      this.selectedItem = null;
      this.signaler.signal('signal');
    }
  }

}
