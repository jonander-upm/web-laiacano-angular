import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order, Status} from "../../services/order.model";
import {Observable, of} from "rxjs";
import {ProductService} from "../../services/product.service";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'lc-order-summary-card',
  templateUrl: './lc-order-summary-card.component.html'
})
export class LcOrderSummaryCardComponent implements OnInit {
  @Input() order: Order;

  @Output() btnClicked: EventEmitter<string> = new EventEmitter<string>();

  readonly CURRENCY_SYMBOL = '$';
  private readonly PORTFOLIO_ENDPOINT = '/portfolio'
  private readonly PORTFOLIO_IMAGE_ENDPOINT = this.PORTFOLIO_ENDPOINT + '/images?fileName=';

  firstProductImgUrl: Observable<string>;

  get status() {
    return Status[this.order.status];
  }
  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.firstProductImgUrl = this.productService.getProduct(this.order.orderItems[0].productId).pipe(
      map(product => product.portfolioItem.imageSrc),
      map(imageSrc => environment.REST_API + this.PORTFOLIO_IMAGE_ENDPOINT + imageSrc)
    );
  }
}
