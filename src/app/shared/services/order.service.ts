import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Order} from "./order.model";
import {HttpService} from "../../core/http.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly ORDER_ENDPOINT = environment.REST_API + '/orders';
  constructor(private readonly httpService: HttpService) { }

  getOrder(id: string): Observable<Order> {
    return this.httpService
      .get(`${this.ORDER_ENDPOINT}/${id}`);
  }

  createOrder(order: Order): Observable<string> {
    return this.httpService.post(this.ORDER_ENDPOINT, order).pipe(
      map(order => order.id)
    );
  }
}
