import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ImageViewComponent} from "../../shared/dialogs/image-view/image-view.component";
import {ProductService} from "../../shared/services/product.service";
import {map, tap} from "rxjs/operators";
import {filter} from "rxjs";
import {Format, Product} from "../../shared/services/product.model";

@Component({
  selector: 'lc-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  readonly CURRENCY_SYMBOL = '$';
  readonly SOLD_OUT = 'Sold Out';

  productList: LcProductItem[] = [];

  constructor(private readonly dialog: MatDialog, private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  private getProductList() {
    this.productService.getProducts().pipe(
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

  addToCart(id: string) {
    // TODO: Implement functionality
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
