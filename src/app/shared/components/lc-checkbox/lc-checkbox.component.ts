import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lc-checkbox',
  templateUrl: './lc-checkbox.component.html',
})
export class LcCheckboxComponent implements OnInit {
  @Input() text?: string;
  @Input() checked?: boolean;

  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleCheckbox() {
    this.checked = !this.checked;
    this.toggleEvent.emit(this.checked);
  }
}
