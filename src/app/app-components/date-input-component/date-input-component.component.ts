import { Component, Input, forwardRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValidDate } from '@app/app-form-validators';

/** #WIP Date picker. */
@Component({
  selector: 'app-date-input-component',
  templateUrl: './date-input-component.component.html',
  styleUrls: ['./date-input-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponentComponent),
      multi: true
    },
  ]
})
export class DateInputComponentComponent implements ControlValueAccessor {
  private dateString: string;
  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  @HostListener('click', ['$event'])
  handleHostClick(event: MouseEvent) {
    this.onTouched();
  }

  // Function to call when the length changes.
  onChange = (date: string) => { };
  // Function to call when the input is touched.
  onTouched = () => { };
  @Input()
  set date(d: string) {
    this.dateString = d;
    this.onChange(d);
    this.onTouched();
  }

  get date(): string {
    return this.dateString;
  }

  constructor() { }

  // Allows Angular to update the model (date).
  // Update the model and changes needed for the view here.
  writeValue(date: string): void {
    this.onChange(this.date);
    this.date = date;
  }
  // Allows Angular to register a function to call when the model (date) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (date: string) => void): void {
    this.onChange = fn;
  }
  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  // Allows Angular to disable the input.
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
