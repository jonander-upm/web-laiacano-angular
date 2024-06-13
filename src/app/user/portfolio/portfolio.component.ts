import { Component, OnInit } from '@angular/core';
import {ImageViewComponent} from "../../shared/dialogs/image-view/image-view.component";
import {MatDialog} from "@angular/material/dialog";
import {filter, forkJoin, mergeMap, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {FilterService} from "../../shared/services/filter.service";
import {PortfolioService} from "../../shared/services/portfolio.service";
import {PortfolioItem} from "../../shared/services/portfolio.model";
import {ProductService} from "../../shared/services/product.service";
import {Router} from "@angular/router";
import {Route} from "../../shared/enums/route";

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html'
})
export class PortfolioComponent implements OnInit {
  portfolioItemList$: Observable<LcPortfolioItemDisplay[]>;

  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly filterService: FilterService,
              private readonly portfolioService: PortfolioService,
              private readonly productService: ProductService,
              ) { }

  ngOnInit(): void {
    this.getPortfolioItemList();
  }

  private getPortfolioItemList() {
    this.portfolioItemList$ = this.filterService.getFilters().pipe(
      mergeMap(filters =>
        this.portfolioService.getPortfolioItems(filters.title)
      ),
      filter(portfolioItems => portfolioItems !== undefined),
      mergeMap(portfolioItems => this.mapPortfolioItems(portfolioItems)),
    );
  }

  private mapPortfolioItems(portfolioItems: PortfolioItem[]): Observable<LcPortfolioItemDisplay[]> {
    return forkJoin(portfolioItems.map(portfolioItem =>
      this.productService.getProducts(undefined, undefined, portfolioItem.id).pipe(
        map(products => ({
          ...portfolioItem,
          hasProducts: products.length > 0
        }) as LcPortfolioItemDisplay)
      )
    ));
  }

  viewImage(imageSrc: string) {
    const imgDialog = this.dialog.open(ImageViewComponent, {
      height: '80%',
      panelClass: 'img-view-dialog'
    });
    imgDialog.componentInstance.imageSrc = imageSrc;
  }

  viewInShop(portfolioItemId: string) {
    this.filterService.setFilters({
      portfolioItemId: portfolioItemId,
    });
    this.router.navigate([Route.SHOP]).then();
  }

}

export interface LcPortfolioItemDisplay extends PortfolioItem {
  hasProducts: boolean,
}
