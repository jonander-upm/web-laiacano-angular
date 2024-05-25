import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'lc-dropdown-section',
  templateUrl: './lc-dropdown-section.component.html'
})
export class LcDropdownSectionComponent implements OnInit {
  @Input() title?: string;
  @Input() content: TemplateRef<any>;
  @Input() showContent: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleShowContent() {
    this.showContent = !this.showContent;
  }
}
