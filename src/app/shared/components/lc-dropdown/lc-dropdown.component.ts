import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'lc-dropdown',
  templateUrl: './lc-dropdown.component.html',
  styleUrls: ['lc-dropdown.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity:0}),
        animate(150, style({opacity:1}))
      ]),
      transition(':leave', [
        animate(150, style({opacity:0}))
      ])
    ])
  ]
})
export class LcDropdownComponent implements OnInit {
  @ViewChild('dropdownInput') dropdownInput: ElementRef;

  @Input() label!: string;
  @Input() selected?: string;
  @Input() options: LcDropdownOption[] = [];
  @Input() fieldSize: 'small' | 'medium' | 'large' | 'responsive' = 'medium';
  @Input() disabled = false;

  @Output() optionSelected: EventEmitter<string> = new EventEmitter<string>();

  get selectedOption(): LcDropdownOption | undefined {
    return this.options.find(option => option.selected);
  }

  showContent: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  focusInput() {
    if(!this.showContent) {
      this.dropdownInput.nativeElement.focus();
    }
  }

  openContent(): void {
    this.showContent = true;
  }

  closeContent(): void {
    setTimeout(() => {
      this.showContent = false;
    }, 100);
  }

  selectOption(id: string) {
    let selectedOption: string;
    this.options.forEach(option => {
      option.selected = !option.selected && option.id === id
      if (option.selected) {
        selectedOption = option.id;
      }
    });
    this.optionSelected.emit(selectedOption);
  }

}

export interface LcDropdownOption {
  id: string;
  label: string;
  selected?: boolean;
}
