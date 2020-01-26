import { AbstractControl } from '@angular/forms';

/** Miscellaneous utils used through all the app. */

export function todayWithoutTime(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
}

export function yesterdayWithoutTime(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
}

export function tomorrowWithoutTime(): Date {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
}

export function computeControlValidity(control: AbstractControl): boolean {
    return control.invalid && (control.touched || control.dirty);
}
