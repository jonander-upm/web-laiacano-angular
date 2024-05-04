import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lc-subheader',
  templateUrl: './lc-subheader.component.html',
})
export class LcSubheaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() filterData?: LcFilterData;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface LcSubheaderData {
  title: string;
  filterData: LcFilterData;
}

export interface LcFilterData {
  title?: string;
  type?: LcFilterType;
  options?: LcDropdownOption[];
  selectedOption?: string;
}
export type LcFilterType = 'text' | 'dropdown' | 'date';
export interface LcDropdownOption {
  id: string;
  text: string;
  enabled: boolean;
}
