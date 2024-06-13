import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ImageViewComponent} from "../../shared/dialogs/image-view/image-view.component";
import {ProductService} from "../../shared/services/product.service";
import {map, tap} from "rxjs/operators";
import {filter, mergeMap} from "rxjs";
import {Format, Product} from "../../shared/services/product.model";
import {FilterService} from "../../shared/services/filter.service";
import {ShoppingCartService} from "../../shared/services/shopping-cart.service";

@Component({
  selector: 'lc-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit, OnDestroy {
  readonly CURRENCY_SYMBOL = '$';
  readonly SOLD_OUT = 'Sold Out';

  productList: LcProductItem[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private readonly productService: ProductService,
    private readonly filterService: FilterService,
    private readonly shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList() {
    this.filterService.getFilters().pipe(
      mergeMap(filters =>
        this.productService.getProducts(filters.title, filters.format, filters.portfolioItemId)
      ),
      filter(products => products !== undefined),
        map(products =>
          products.flatMap(product =>
            this.mapProductItem(product)
          )
        ),
        tap(productItems => this.productList = productItems),
    ).subscribe();
  }

  private mapProductItem(product: Product): LcProductItem {
    return {
      id: product.id,
      title: product.portfolioItem.name,
      format: Format[product.format] === Format.DIGITAL ? `( ${ Format[product.format] } )` : undefined,
      price: product.stock ? `${ product.price } ${ this.CURRENCY_SYMBOL }` : this.SOLD_OUT,
      imageSrc: product.portfolioItem.imageSrc,
      stock: product.stock,
      disabled: !product.stock,
    }
  }

  viewImage(imageSrc: string) {
    const imgDialog = this.dialog.open(ImageViewComponent, {
      height: '80%',
      panelClass: 'img-view-dialog'
    });
    imgDialog.componentInstance.imageSrc = imageSrc;
  }

  addToCart(product: LcProductItem) {
    this.shoppingCartService.addProductToCart(product);
  }

  ngOnDestroy(): void {
    this.filterService.setFilters({});
  }
}

export interface LcProductItem {
  id: string;
  title: string;
  format?: string;
  price: string;
  imageSrc: string;
  stock: number;
  disabled?: boolean;
}
