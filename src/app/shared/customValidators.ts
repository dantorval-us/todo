import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function noWithespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = (control.value || '').trim().length === 0;
    return forbidden ? {whiteSpaceOnly: true} : null;
  }
}