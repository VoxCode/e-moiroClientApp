import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

export function NumberRangeValidator(minVal: number, maxVal: number): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const aux = control.value;
    if (aux !== null && (aux < minVal || aux > maxVal)) {
      return {numberRange: true};
    }
    return null;
  };
}
