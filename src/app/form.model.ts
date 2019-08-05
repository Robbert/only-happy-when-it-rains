import { AbstractControl } from '@angular/forms';

/*
 * Since `FormGroup` doesn't support generics (`new FormGroup<FormData>`) the following
 * type can be used to validate a form control exists for every key in the data model.
 *
 * Extending the model should cause a warning for incomplete `FormGroup` definitions.
 */
export type FormGroupControls<T extends { [key: string]: any }> = { [P in keyof T]: AbstractControl };
