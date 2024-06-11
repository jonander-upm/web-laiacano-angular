import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, mergeMap, Observable, tap} from "rxjs";
import {ShoppingCartService} from "../shared/services/shopping-cart.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {Route} from "../shared/enums/route";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UserComponent implements OnInit {

  pageData?: LcPageData;
  showFilters: boolean = false;
  id?: string;

  readonly shoppingCartItemNumber$: Observable<number>;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly shoppingCartService: ShoppingCartService
  ) {
    this.shoppingCartItemNumber$ = this.shoppingCartService.getShoppingCartItemNumber();
  }

  ngOnInit(): void {
    this.handleRouterData();
  }

  private handleRouterData() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      mergeMap(() => this.activatedRoute.firstChild.data),
      tap(data => {
        this.pageData = data['pageData'];
        if(this.pageData?.hasId) {
          this.id = this.activatedRoute.firstChild.snapshot.paramMap.get('id');
        } else {
          this.id = undefined;
        }
      }),
    ).subscribe();
  }

  toggleFilters(filtersShown: boolean): void {
    this.showFilters = filtersShown;
  }

  goToShoppingCart(): void {
    this.router.navigateByUrl(Route.SHOPPING_CART).then(r => {});
  }

}

export interface LcPageData {
  title: string;
  hasFilters: boolean;
  showCart: boolean;
  hasId: boolean;
}
