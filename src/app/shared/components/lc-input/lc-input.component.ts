import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
} from "@angular/forms";

@Component({
  selector: 'lc-input',
  templateUrl: './lc-input.component.html',
  styleUrls: ['./lc-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LcInputComponent),
      multi: true
    }
  ]
})
export class LcInputComponent implements OnInit, ControlValueAccessor{
  @Input() label!: string;
  @Input() content: string = '';
  @Input() password: boolean = false;
  @Input() formControlName: string = 'field';
  @Input() showHint? = false;
  @Input() hintLabel?: string;
  @Input() fieldSize: 'xsmall' | 'small' | 'medium' | 'large' | 'responsive' = 'medium';
  @Input() parentFormGroup: FormGroup = this.formBuilder.group({'field': new FormControl(this.content)})
  @Input() disabled = false;
  @Input() readonly = false

  @Output() contentChange = new EventEmitter<string>();

  viewPassword?: boolean = false;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.writeValue(this.content);
  }

  writeValue(value: string): void {
    this.parentFormGroup?.controls[this.formControlName].setValue(value)
    this.content = value;
    this.contentChangeEvent();
  }
  registerOnChange(fn: () => void): void {
    return;
  }
  registerOnTouched(fn: () => void): void {
    return;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleViewPassword(): void {
    this.viewPassword = !this.viewPassword;
  }

  contentChangeEvent(): void {
    this.contentChange.emit(
      this.parentFormGroup?.controls[this.formControlName].value
    );
  }
}
