import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {LcProductItem} from "../../../user/shop/shop.component";

@Component({
  selector: 'lc-cart-summary-card',
  templateUrl: './lc-cart-summary-card.component.html',
})
export class LcCartSummaryCardComponent implements OnInit {
  @Input() product: LcProductItem;
  @Input() amount?: number;
  @Input() total?: string;
  @Input() readonly?: boolean;

  @Output() itemRemoved: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemAdded= new EventEmitter<number>();

  private readonly PORTFOLIO_ENDPOINT = '/portfolio'
  private readonly PORTFOLIO_IMAGE_ENDPOINT = this.PORTFOLIO_ENDPOINT + '/images?fileName=';
  imageUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = environment.REST_API + this.PORTFOLIO_IMAGE_ENDPOINT + this.product.imageSrc;
  }

}
