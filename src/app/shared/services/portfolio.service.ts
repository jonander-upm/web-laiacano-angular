import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpService} from "../../core/http.service";
import {Observable} from "rxjs";
import {PortfolioItem} from "./portfolio.model";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private readonly PORTFOLIO_ENDPOINT = environment.REST_API + '/portfolio';

  constructor(private readonly httpService: HttpService) { }

  getPortfolioItems(title?: string): Observable<PortfolioItem[]> {
    return this.httpService
      .param('name', title)
      .get(this.PORTFOLIO_ENDPOINT);
  }
}
