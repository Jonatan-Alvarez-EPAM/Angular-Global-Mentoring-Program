import { Component, Input, forwardRef, HostBinding, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isValidLength } from '@app/app-form-validators/validators';

@Component({
  selector: 'app-duration-input-component',
  templateUrl: './duration-input-component.component.html',
  styleUrls: ['./duration-input-component.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationInputComponentComponent),
      multi: true
    },
  ]
})
export class DurationInputComponentComponent implements ControlValueAccessor {
  private duration: number;
  isValidLength: boolean;
  @Input()
  set minutes(duration: number) {
    this.duration = duration;
    this.isValidLength = !isValidLength(String(duration));
    this.onChange(duration);
    this.onTouched();
  }

  get minutes(): number {
    return this.duration;
  }
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
  onChange = (length: number) => { };
  // Function to call when the input is touched.
  onTouched = () => { };

  constructor() { }

  // Allows Angular to update the model (length).
  // Update the model and changes needed for the view here.
  writeValue(length: number): void {
    this.onChange(this.minutes);
    this.minutes = length;
  }
  // Allows Angular to register a function to call when the model (length) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (length: number) => void): void {
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
