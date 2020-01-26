import { Component, ViewChild, ElementRef, forwardRef, Input, HostBinding, HostListener } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Author } from '@app/app-models';

@Component({
  selector: 'app-authors-input-component',
  templateUrl: './authors-input-component.html',
  styleUrls: ['./authors-input-component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsInputComponent),
      multi: true
    },
  ]
})
export class AuthorsInputComponent implements ControlValueAccessor {
  @Input()
  options: Author[] = [];
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
  readonly authorControl = new FormControl();
  readonly filteredAuthors$: Observable<Author[]>;
  addOnBlur = true;
  authors: Author[] = [];

  @ViewChild('authorInput', { static: false }) authorInput: ElementRef<HTMLInputElement>;
  @ViewChild('autocomplete', { static: false }) matAutocomplete: MatAutocomplete;

  // Function to call when the length changes.
  onChange = (authors: Author[]) => { };
  // Function to call when the input is touched.
  onTouched = () => { };

  constructor() {
    this.filteredAuthors$ = this.authorControl.valueChanges.pipe(
      filter(author => typeof author === typeof String()),
      map((author: string) => this.filter(author)));
  }

  remove(author: Author): void {
    const index = this.authors.findIndex(innerAuthor => innerAuthor.id === author.id);

    if (index >= 0) {
      this.authors.splice(index, 1);
      this.onChange(this.authors);
      this.onTouched();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authors.push(event.option.value);
    this.onChange(this.authors);
    this.onTouched();
    this.authorInput.nativeElement.value = '';
    this.authorControl.setValue(null);
  }

  // Allows Angular to update the model (date).
  // Update the model and changes needed for the view here.
  writeValue(authors: Author[]): void {
    this.onChange(this.authors);
    if (authors) {
      this.authors = authors;
    }
  }
  // Allows Angular to register a function to call when the model (authors) changes.
  // Save the function as a property to call later here.
  registerOnChange(fn: (authors: Author[]) => void): void {
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

  private filter(value: string): Author[] {
    if (!value) {
      return this.options.slice();
    }

    const filterValue = value.toLowerCase();
    return this.options.filter(author => author.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
