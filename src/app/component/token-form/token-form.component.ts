import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { FormGroupControls } from '../../form.model';
import { TokenFormData } from './token-form.model';

// TODO: add inputs for async `validateToken` and `saveToken`
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'lib-token-form',
    templateUrl: './token-form.component.html',
    styleUrls: ['./token-form.component.scss'],
})
export class TokenFormComponent {
    /*
     * Similar to `setCustomValidity` in HTML, you can optionally define a validator
     * for the token that returns an empty string for success, or an error message
     * when the token does not work.
     */
    @Input('check-custom-validity') public validateToken: (token: string) => Observable<string>;

    /*
     * The token value provided by the user. When a validator has been defined, only
     * valid tokens will be emitted.
     */
    @Output('token') public token = new EventEmitter<string>();

    public form = new FormGroup({
        token: new FormControl(''),
    } as FormGroupControls<TokenFormData>);

    public handleSubmit() {
        const formData = this.form.value as TokenFormData;

        // TODO: Check validity
        this.token.emit(formData.token);
    }
}
