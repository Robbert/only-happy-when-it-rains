import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MILLISECONDS_IN_HOUR } from '../../util/time';
import { TimeAgoComponent } from './time-ago.component';

type TestState = {
    fixture: ComponentFixture<TimeAgoComponent>;
    instance: TimeAgoComponent;
    element?: HTMLTimeElement;
};

describe('Description of time relative to a specified date', () => {
    let state: TestState;

    const ISO_TIME = '2000-01-01T00:00:00Z';
    const TIME = Date.parse(ISO_TIME);
    const HOUR_BEFORE = TIME - MILLISECONDS_IN_HOUR;

    beforeEach(async () => {
        // Arrange
        await TestBed.configureTestingModule({
            declarations: [TimeAgoComponent],
        }).compileComponents();

        const fixture = TestBed.createComponent(TimeAgoComponent);
        const instance = fixture.componentInstance;

        instance.time = TIME;
        instance.relativeTo = HOUR_BEFORE;

        fixture.detectChanges();

        state = {
            fixture,
            instance,
        };
    });

    describe('providing the time in machine-readable format', () => {
        beforeEach(() => {
            const element = state.fixture.nativeElement.querySelector('time[datetime]');

            state = {
                ...state,
                element,
            };
        });

        it('should provide the timestamp in the datetime="" attribute of a HTML <time> element', () => {
            const { element } = state;

            if (element) {
                const date = Date.parse(element.dateTime);

                expect(date).toBe(TIME);
            } else {
                expect(element).toBeTruthy();
            }
        });
    });

    describe('providing the time in human-readable format', () => {
        beforeEach(() => {
            const element = state.fixture.nativeElement;

            state = {
                ...state,
                element,
            };
        });

        it('should indicate time passed in an appropriate scale (minutes, hours, seconds)', () => {
            const { element } = state;

            if (element) {
                const text = element.textContent;

                expect(text).toContain('1');
                expect(text).toContain('hour');
            } else {
                expect(element).toBeTruthy();
            }
        });
    });
});
