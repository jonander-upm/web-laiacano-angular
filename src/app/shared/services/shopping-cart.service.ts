import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, reduce, tap} from "rxjs";
import {map} from "rxjs/operators";
import {LcProductItem} from "../../user/shop/shop.component";
import {LcOrderItem} from "./order.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  shoppingCart: LcOrderItem[];
  private shoppingCart$: BehaviorSubject<LcOrderItem[]>;
  private readonly CART_STORAGE_KEY = 'lc-cart';
  constructor() {
    this.initShoppingCart();
  }

  private initShoppingCart(): void {
    this.shoppingCart = JSON.parse(localStorage.getItem(this.CART_STORAGE_KEY) ?? '[]');
    this.shoppingCart$ = new BehaviorSubject<LcOrderItem[]>(this.shoppingCart);
    this.getShoppingCart().pipe(
      tap(shoppingCart =>
        localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(shoppingCart)),
      ),
    ).subscribe();
  }

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

  getShoppingCartTotalPrice(): Observable<number> {
    return this.shoppingCart$.asObservable().pipe(
      map(shoppingCart =>
        shoppingCart.map(item => item.total).reduce(
          (prev, cur) => prev + cur, 0
        )),
    );
  }

  addProductToCart(product: LcProductItem, amount: number = 1): void {
    const productIndex = this.shoppingCart.findIndex(orderLine =>
      orderLine.product.id === product.id
    );
    if (productIndex >= 0 && this.shoppingCart[productIndex].amount < product.stock) {
      this.shoppingCart[productIndex].amount += amount;
      this.shoppingCart[productIndex].total = this.shoppingCart[productIndex].amount
        * Number.parseFloat(this.shoppingCart[productIndex].product.price);
    } else if (productIndex === -1) {
      this.shoppingCart.push({ product, amount, total: amount * Number.parseFloat(product.price) });
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
        this.shoppingCart[productIndex].total = this.shoppingCart[productIndex].amount
          * Number.parseFloat(this.shoppingCart[productIndex].product.price);
      }
      this.shoppingCart$.next(this.shoppingCart);
  }

  emptyShoppingCart() {
    this.shoppingCart = [];
    this.shoppingCart$.next(this.shoppingCart);
  }
}
