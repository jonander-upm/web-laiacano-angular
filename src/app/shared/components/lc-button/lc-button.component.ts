import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lc-button',
  templateUrl: './lc-button.component.html',
  styleUrls: ['./lc-button.component.scss']
})
export class LcButtonComponent implements OnInit {
  @Input() text?: string;
  @Input() color: LcButtonColor = 'secondary';
  @Input() size: 'small' | 'medium' | 'large' | 'responsive' = 'medium';
  @Input() disabled?: boolean = false;
  @Input() icon?: string;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  btnClick(): any {
    if(this.disabled) {
      return;
    }
    this.clickEvent.emit();
  }
}

export type LcButtonColor = 'primary' | 'secondary';
