import {Component, OnDestroy, OnInit} from '@angular/core';
import {LcDropdownOption} from "../../lc-dropdown/lc-dropdown.component";
import {Format} from "../../../services/product.model";
import {FilterService} from "../../../services/filter.service";
import {LcFilterData, LcFilterType} from "../../../services/filter.model";

@Component({
  selector: 'lc-filter-section',
  templateUrl: './lc-filter-section.component.html'
})
export class LcFilterSectionComponent implements OnInit, OnDestroy {
  filters: LcFilterData = {};

  formatOptions: LcDropdownOption[] = [
    {
      id: 'PHYSICAL',
      label: Format['PHYSICAL'],
    },
    {
      id: 'DIGITAL',
      label: Format['DIGITAL'],
    }
  ];

  constructor(private readonly filterService: FilterService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.filterService.setFilters({});
  }

  applyFilters(type: LcFilterType, value: string) {
    if(value) {
      this.filters[type] = value;
    } else {
      delete this.filters[type];
    }

    this.filterService.setFilters(this.filters);
  }
}
