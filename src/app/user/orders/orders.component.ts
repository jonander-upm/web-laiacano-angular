import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../shared/services/order.service";
import {FilterService} from "../../shared/services/filter.service";
import {filter, mergeMap, Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Order, Status} from "../../shared/services/order.model";
import {Router} from "@angular/router";
import {Route} from "../../shared/enums/route";

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orderList: Observable<Order[]> = of([]);

  constructor(private readonly orderService: OrderService,
              private readonly filterService: FilterService,
              private readonly  router: Router) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  private getOrderList() {
    this.orderList = this.filterService.getFilters().pipe(
      mergeMap(filters =>
        this.orderService.getOrders(filters.status)
      ),
      filter(orders => orders !== undefined),
      map(orders => orders.sort((curOrder, prevOrder) =>
        Date.parse(prevOrder.createdDate) - Date.parse(curOrder.createdDate)
      ))
    );
  }

  goToSummary(id: string) {
    const route = Route.ORDER_SUMMARY.replace(':id', id);
    this.router.navigate([route]).then();
  }
}
