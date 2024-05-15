import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LcFilterData} from "./filter.model";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _productFilters$: BehaviorSubject<LcFilterData> = new BehaviorSubject<LcFilterData>({});

  constructor() { }

  setFilters(filters: LcFilterData) {
    this._productFilters$.next(filters);
  }

  getFilters() {
    return this._productFilters$.asObservable();
  }
}
