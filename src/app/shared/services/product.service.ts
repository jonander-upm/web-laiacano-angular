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

  getProducts(title?: string, format?: string): Observable<Product[]> {
    return this.httpService
      .param('name', title)
      .param('format', format)
      .get(this.PRODUCT_ENDPOINT);
  }

  getProduct(id: string): Observable<Product> {
    return this.httpService
      .get(`${this.PRODUCT_ENDPOINT}/${id}`);
  }
}
