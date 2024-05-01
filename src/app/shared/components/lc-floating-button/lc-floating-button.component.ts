import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lc-floating-button',
  templateUrl: './lc-floating-button.component.html',
})
export class LcFloatingButtonComponent implements OnInit {
  @Input() size: LcFloatingButtonSize = 'small';
  @Input() color: LcFloatingButtonColor = 'primary';
  @Input() icon?: string;

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}

export type LcFloatingButtonSize = 'small' | 'medium' | 'big';
export type LcFloatingButtonColor = 'primary' | 'secondary' | 'none';

