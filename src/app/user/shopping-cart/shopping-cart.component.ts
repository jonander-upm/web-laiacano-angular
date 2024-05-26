import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lc-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {
  readonly SHIPPING_ADDRESS_TITLE: string = 'Shipping Address';
  readonly BILLING_ADDRESS_TITLE: string = 'Billing Address';

  copyBillingAddress: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleCopyBillingAddress(checked: boolean) {
    this.copyBillingAddress = checked;
  }
}
