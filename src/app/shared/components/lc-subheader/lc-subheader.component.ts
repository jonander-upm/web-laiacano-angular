import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lc-subheader',
  templateUrl: './lc-subheader.component.html',
})
export class LcSubheaderComponent implements OnInit {
  @Input() title: string = '';
  @Input() id?: string;
  @Input() hasFilters?: boolean;

  @Output() toggleFilterEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  showFilters: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.toggleFilterEvent.emit(false);
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
    this.toggleFilterEvent.emit(this.showFilters);
  }
}

