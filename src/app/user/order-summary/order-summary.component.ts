import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mergeAll, mergeMap, Observable, take, toArray} from "rxjs";
import {LcOrderItem, Order, OrderItem} from "../../shared/services/order.model";
import {OrderService} from "../../shared/services/order.service";
import {map} from "rxjs/operators";
import {ProductService} from "../../shared/services/product.service";
import {Format, Product} from "../../shared/services/product.model";
import {LcProductItem} from "../shop/shop.component";

@Component({
  selector: 'lc-order-summary',
  templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent implements OnInit {
  readonly SHIPPING_ADDRESS_TITLE: string = 'Shipping Address';
  readonly BILLING_ADDRESS_TITLE: string = 'Billing Address';
  readonly CURRENCY_SYMBOL = '$';

  order$: Observable<Order>;
  orderItems$: Observable<LcOrderItem[]>;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly orderService: OrderService,
              private readonly productService: ProductService,
  ) { }

  ngOnInit(): void {
    const route = this.activatedRoute.snapshot;
    const id = route.paramMap.get('id');
    this.order$ = this.orderService.getOrder(id).pipe(
      take(1),
    );
    this.orderItems$ = this.order$.pipe(
      map(order => order.orderItems),
      mergeAll(),
      mergeMap(orderItem => this.getMappedOrderItem(orderItem)),
      toArray()
    );
  }

  private getMappedOrderItem(orderItem: OrderItem): Observable<LcOrderItem> {
    return this.productService.getProduct(orderItem.productId).pipe(
      map(product => ({
        product: this.mapProductItem(product),
        amount: orderItem.amount,
        total: orderItem.amount * product.price
      })),
    );
  }

  private mapProductItem(product: Product): LcProductItem {
    return {
      id: product.id,
      title: product.portfolioItem.name,
      format: Format[product.format] === Format.DIGITAL ? `( ${ Format[product.format] } )` : undefined,
      price: `${ product.price } ${ this.CURRENCY_SYMBOL }`,
      imageSrc: product.portfolioItem.imageSrc,
      stock: product.stock,
      disabled: !product.stock,
    }
  }

}
