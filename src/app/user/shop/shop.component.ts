import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ImageViewComponent} from "../../shared/dialogs/image-view/image-view.component";

@Component({
  selector: 'lc-shop',
  templateUrl: './shop.component.html',
})
export class ShopComponent implements OnInit {
  readonly CURRENCY_SYMBOL = '$';
  readonly mockProductList: Product[] = [
    {
      id: '1',
      title: 'Test Product 1',
      format: 'Digital',
      price: 30,
      imageSrc: 'https://picsum.photos/1200/700',
    },
    {
      id: '2',
      title: 'Test Product 2',
      price: 120,
      imageSrc: 'https://picsum.photos/700/1200',
    },
    {
      id: '3',
      title: 'Test Product 3',
      format: 'Digital',
      price: 60,
      imageSrc: 'https://picsum.photos/1000/1000',
    },
    {
      id: '4',
      title: 'Test Product 4',
      format: 'Digital',
      price: 10,
      imageSrc: 'https://picsum.photos/2000/1000',

    },
    {
      id: '5',
      title: 'Test Product 5',
      price: 900,
      imageSrc: 'https://picsum.photos/500/800',
    },
  ];

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
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

export interface Product {
  id: string;
  title: string;
  format?: string;
  price: number;
  imageSrc: string;
}
