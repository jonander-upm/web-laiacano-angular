import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lc-amount-selector',
  templateUrl: './lc-amount-selector.component.html'
})
export class LcAmountSelectorComponent implements OnInit {
  @Input() amount: number = 0;
  @Input() minAmount: number = 0;
  @Input() maxAmount?: number;

  @Output() itemRemoved: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemAdded: EventEmitter<number> = new EventEmitter<number>();

  get stringAmount() {
    return String(this.amount);
  }

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    if(this.amount >= this.maxAmount) {
      return;
    }

    this.amount += 1;
    this.itemAdded.emit(1);
  }

  removeItem() {
    if(this.amount <= this.minAmount) {
      return;
    }

    this.amount -= 1;
    this.itemRemoved.emit(1);
  }
}
