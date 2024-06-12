import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {LcDropdownOption} from "../../lc-dropdown/lc-dropdown.component";
import {Format} from "../../../services/product.model";
import {FilterService} from "../../../services/filter.service";
import {LcFilterData, LcFilterType} from "../../../services/filter.model";
import {Status} from "../../../services/order.model";

@Component({
  selector: 'lc-filter-section',
  templateUrl: './lc-filter-section.component.html'
})
export class LcFilterSectionComponent implements OnInit, OnDestroy {
  @Input() showFilters: LcFilterType[] = [];

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

  statusOptions: LcDropdownOption[] = [
    {
      id: 'PENDING',
      label: Status['PENDING'],
    },
    {
      id: 'IN_PROGRESS',
      label: Status['IN_PROGRESS'],
    },
    {
      id: 'READY_TO_SHIP',
      label: Status['READY_TO_SHIP'],
    },
    {
      id: 'SHIPPED',
      label: Status['SHIPPED'],
    },
    {
      id: 'DELIVERED',
      label: Status['DELIVERED'],
    },
    {
      id: 'CANCELLED',
      label: Status['CANCELLED'],
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
