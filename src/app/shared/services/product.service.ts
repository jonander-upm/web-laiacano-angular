import { Injectable } from '@angular/core';
import {HttpService} from "../../core/http.service";
import {Observable} from "rxjs";
import {Product} from "./product.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly PRODUCT_ENDPOINT = environment.REST_API + '/products';

  constructor(private readonly httpService: HttpService) { }

  getProducts(): Observable<Product[]> {
    return this.httpService.get(this.PRODUCT_ENDPOINT);
  }
}
