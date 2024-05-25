import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, reduce, tap} from "rxjs";
import {map} from "rxjs/operators";
import {Product} from "./product.model";
import {LcProductItem} from "../../user/shop/shop.component";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: LcOrderItem[] = [];
  private readonly shoppingCart$: BehaviorSubject<LcOrderItem[]> = new BehaviorSubject<LcOrderItem[]>(this.shoppingCart);

  constructor() { }

  getShoppingCart(): Observable<LcOrderItem[]> {
    return this.shoppingCart$.asObservable();
  }

  getShoppingCartItemNumber(): Observable<number> {
    return this.shoppingCart$.asObservable().pipe(
      map(shoppingCart =>
        shoppingCart.map(item => item.amount).reduce(
          (prev, cur) => prev + cur, 0
      )),
    );
  }

  addProductToCart(product: LcProductItem, amount: number = 1): void {
    const productIndex = this.shoppingCart.findIndex(orderLine =>
      orderLine.product.id === product.id
    );
    if (productIndex >= 0 && this.shoppingCart[productIndex].amount <= product.stock) {
      this.shoppingCart[productIndex].amount += amount;
    } else if (productIndex === -1) {
      this.shoppingCart.push({ product, amount });
    }
    this.shoppingCart$.next(this.shoppingCart);
  }

  removeProductFromCart(product: LcProductItem, amount?: number) {
      const productIndex = this.shoppingCart.findIndex(orderLine =>
        orderLine.product.id === product.id
      );
      if (productIndex === -1) {
        return;
      }

      if (amount >= this.shoppingCart[productIndex].amount) {
        this.shoppingCart.splice(productIndex, 1);
      } else {
        this.shoppingCart[productIndex].amount -= amount;
      }
      this.shoppingCart$.next(this.shoppingCart);
  }

  emptyShoppingCart() {
    this.shoppingCart = [];
    this.shoppingCart$.next(this.shoppingCart);
  }
}

// TODO: Move into order service
export interface LcOrderItem {
  product: LcProductItem;
  amount: number;
}
