import { APP_BASE_HREF } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenFormComponent } from './token-form.component';

type TestState = {
    fixture: ComponentFixture<TokenFormComponent>;
    instance: TokenFormComponent;
    onNext: jest.Mock;
    onError: jest.Mock;
    input?: HTMLInputElement;
    label?: HTMLLabelElement;
};

// `str.toLowerCase()` utility that helps to work with values that are possibly `null`
const toLowerCase = (arg: string | null | undefined): string => (arg ? arg.toLowerCase() : '');

describe('Form to provide API key', () => {
    const CORRECT_TOKEN = 'this-is-a-correct-token';
    // const INCORRECT_TOKEN = 'invalid-token';

    let state: TestState;

    beforeEach(async () => {
        // Arrange
        await TestBed.configureTestingModule({
            declarations: [TokenFormComponent],
            imports: [FormsModule, ReactiveFormsModule],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
        }).compileComponents();

        const fixture = TestBed.createComponent(TokenFormComponent);
        const instance = fixture.componentInstance;

        fixture.detectChanges();

        state = {
            fixture,
            instance,
            onNext: jest.fn(),
            onError: jest.fn(),
        };
    });

    describe('allowing the user to enter the token', () => {
        beforeEach(() => {
            const input = state.fixture.nativeElement.querySelector('input[name=token]');
            const label = state.fixture.nativeElement.querySelector(`label[for="${input.id}"]`);

            // Act: simulate typing or pasting the token
            input.value = CORRECT_TOKEN;
            input.dispatchEvent(new Event('input'));

            state = {
                ...state,
                input,
                label,
            };
        });

        it('should provide a writable text input', () => {
            const { input } = state;

            expect(input).toBeTruthy();

            if (input) {
                expect(input.readOnly).toBe(false);
                expect(input.disabled).toBe(false);
            }
        });

        it('should be a semantic pair for label/input', () => {
            const { input, label } = state;

            expect(input).toBeTruthy();
            expect(label).toBeTruthy();

            if (input && label) {
                expect(toLowerCase(label.textContent)).toContain('token');
                expect(label.htmlFor).toBe(input.id);
            }
        });
    });

    describe('confidentiality of the token', () => {
        it('should not visibly display the token to prevent leaking the token', () => {
            // Specifically look for a `<input type="password">`, because it obscures the token
            const passwordInput = state.fixture.nativeElement.querySelector('input[name=token][type=password]');

            expect(passwordInput).toBeTruthy();
        });
    });

    describe('form submission', () => {
        beforeEach(() => {
            // Arrange
            const { fixture, onNext, onError } = state;
            const { componentInstance, nativeElement } = fixture;

            // Arrange:
            const input = nativeElement.querySelector('input[name=token]');

            componentInstance.token.subscribe(onNext, onError);

            state = {
                ...state,
                input,
            };
        });

        it('should emit the token after submitting the form', () => {
            const { fixture, input } = state;

            if (input) {
                // Act: simulate typing the token
                input.value = CORRECT_TOKEN;
                input.dispatchEvent(new Event('input'));

                // Act: simulate submitting the form
                if (input.form) {
                    input.form.submit();
                }

                // Act: trigger Angular
                fixture.detectChanges();

                // Assert
                expect(input.form).toBeTruthy();
                expect(state.onNext).toHaveBeenCalledWith(CORRECT_TOKEN);
                expect(state.onError).not.toHaveBeenCalled();
            } else {
                expect(input).toBeTruthy();
            }
        });
    });

    describe.skip('should only submit the token when the optional validation step has been successful', () => {});
});
