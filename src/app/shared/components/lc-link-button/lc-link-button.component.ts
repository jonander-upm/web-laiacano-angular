import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'lc-link-button',
  templateUrl: './lc-link-button.component.html',
  styleUrls: ['./lc-link-button.component.scss']
})
export class LcLinkButtonComponent implements OnInit {
  @Input() text: string;
  @Input() hrefLink?: string;
  @Input() size: 'small' | 'medium' | 'large' | 'responsive' = 'medium';
  @Input() disabled?: boolean = false;

  @Output() btnClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }
}
