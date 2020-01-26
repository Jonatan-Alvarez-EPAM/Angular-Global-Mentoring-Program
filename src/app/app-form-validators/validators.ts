import { AbstractControl, ValidatorFn } from '@angular/forms';
const isIntegersGreaterThanZero = /^([1-9]\d*)$/;
const validDatePattern = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/\-]\d{4}$/;

export function LengthValidator(control: AbstractControl): { [error: string]: boolean } | null {
    return !isValidLength(control.value) ? { invalidLength: true } : null;
}

export function isValidLength(str: string): boolean {
    return isIntegersGreaterThanZero.test(str);
}

export function DateValidator(control: AbstractControl): { [error: string]: boolean } | null {
    return !isValidDate(control.value) ? { invalidDate: true } : null;
}

export function isValidDate(str: string): boolean {
    if (!validDatePattern.test(str)) {
        return false;
    }

    const [day, month] = str.split('/');
    return !(+month === 2 && (+day === 30 || +day === 31));
}

export function AtLeastItemsValidator(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const length = (control.value || [] as any[]).length;
        return length < min ? { invalidAtLeastItems: { requiredItems: min } } : null;
    };
}
