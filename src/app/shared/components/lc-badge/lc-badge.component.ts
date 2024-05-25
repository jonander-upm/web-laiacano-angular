import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'lc-badge',
  templateUrl: './lc-badge.component.html',
})
export class LcBadgeComponent implements OnInit {
  @Input() value: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
