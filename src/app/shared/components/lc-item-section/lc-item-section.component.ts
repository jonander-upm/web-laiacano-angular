import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'lc-item-section',
  templateUrl: './lc-item-section.component.html',
})
export class LcItemSectionComponent implements OnInit {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() imageSrc?: string;
  @Input() buttonText?: string;
  @Input() buttonIcon?: string;
  @Input() clickableImg?: boolean;
  @Input() opacity: number = 100;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() imageClick: EventEmitter<string> = new EventEmitter<string>();

  get opacityFraction() {
    return this.opacity / 100;
  }
  constructor() { }

  ngOnInit(): void {
  }
}
