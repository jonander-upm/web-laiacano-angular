import {Component, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'lc-dropdown-section-content',
  templateUrl: './lc-dropdown-section-content.component.html'
})
export class LcDropdownSectionContentComponent implements OnInit {
  @Input() content: TemplateRef<any>;
  @Input() contentHeightClass: string = 'h-fit';
  @Input() showContent: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
