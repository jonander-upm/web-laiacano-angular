import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LcFilterType} from "../../services/filter.model";

@Component({
  selector: 'lc-subheader',
  templateUrl: './lc-subheader.component.html',
})
export class LcSubheaderComponent implements OnInit, OnChanges {
  @Input() title: string = '';
  @Input() id?: string;
  @Input() filters?: LcFilterType[] = [];

  @Output() toggleFilterEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  showFilters: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.toggleFilterEvent.emit(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['title']) {
      this.showFilters = false;
    }
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    this.toggleFilterEvent.emit(this.showFilters);
  }
}

