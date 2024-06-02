import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Order} from "./order.model";
import {HttpService} from "../../core/http.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly ORDER_ENDPOINT = environment.REST_API + '/orders';
  constructor(private readonly httpService: HttpService) { }

  createOrder(order: Order) {
    return this.httpService.post(this.ORDER_ENDPOINT, order);
  }
}
