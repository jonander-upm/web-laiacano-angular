import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "../../../../environments/environment";

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
  @Input() buttonDisabled?: boolean;
  @Input() clickableImg?: boolean;
  @Input() opacity: number = 100;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() imageClick: EventEmitter<string> = new EventEmitter<string>();

  private readonly PORTFOLIO_ENDPOINT = '/portfolio'
  private readonly PORTFOLIO_IMAGE_ENDPOINT = this.PORTFOLIO_ENDPOINT + '/images?fileName=';
  imageUrl: string;

  get opacityFraction() {
    return this.opacity / 100;
  }
  constructor() { }

  ngOnInit(): void {
    this.imageUrl = environment.REST_API + this.PORTFOLIO_IMAGE_ENDPOINT + this.imageSrc;
  }
}
