import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lc-button',
  templateUrl: './lc-button.component.html',
  styleUrls: ['./lc-button.component.scss']
})
export class LcButtonComponent implements OnInit {
  @Input() buttonText?: string;
  @Input() buttonSize: 'small' | 'medium' | 'large' | 'responsive' = 'medium';
  @Input() disabled?: boolean = false;

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  btnClick(): any {
    this.clickEvent.emit();
  }
}
