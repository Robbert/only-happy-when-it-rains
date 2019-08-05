import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
import { distinctUntilChanged, map, publishReplay, refCount } from 'rxjs/operators';
import {
    MIILISECONDS_IN_DAY,
    MILLISECONDS_IN_HOUR,
    MILLISECONDS_IN_MINUTE,
    MILLISECONDS_IN_SECOND,
    roundTime,
} from '../util/time';

/*
 * Create an Observable that emits the time at a specified interval.
 *
 * It returns the value of `Date.now()`, although that is technically inaccurate:
 * `Date.now()` will return value a few milliseconds before the moment of the
 * scheduled animation frame, so the displayed time will be a few milliseconds off.
 *
 * When this becomes is an issue, either the `animationFrame` scheduler should expose
 * the time, or a custom observable should be created based on the Browser API
 * `requestAnimationFrame`.
 */
const createClock = (accuracy: number) =>
    timer(0, 0, animationFrame).pipe(
        map(Date.now),
        distinctUntilChanged((a, b) => roundTime(a, accuracy) === roundTime(b, accuracy)),
    );

@Injectable({
    providedIn: 'root',
})
/**
 * Provides the current display time with several levels of accuracy
 *
 * Use these values when you want to display time-relative information in components,
 * but you want to prevent updating the interface at random intervals.
 *
 * For example: when you have a list of tweets that display "x minutes ago",
 * it is least distracting if these relative times are updated all at once,
 * at the moment the system clock advances from one minute to the next.
 *
 * WARNING: Will generally not emit a value when the browser window is not visible.
 */
export class ClockService {
    private second$: Observable<number>;
    private minute$: Observable<number>;
    private hour$: Observable<number>;
    private day$: Observable<number>;

    constructor() {
        this.second$ = createClock(MILLISECONDS_IN_SECOND).pipe(
            publishReplay(1),
            refCount(),
        );

        this.minute$ = createClock(MILLISECONDS_IN_MINUTE).pipe(
            publishReplay(1),
            refCount(),
        );

        this.hour$ = createClock(MILLISECONDS_IN_HOUR).pipe(
            publishReplay(1),
            refCount(),
        );

        this.day$ = createClock(MIILISECONDS_IN_DAY).pipe(
            publishReplay(1),
            refCount(),
        );
    }
    /**
     * Get the display time in second accuracy
     */
    public getSecond$() {
        return this.second$;
    }

    /**
     * Get the display time in minute accuracy
     */
    public getMinute$() {
        return this.minute$;
    }

    /**
     * Get the display time in hour accuracy
     */
    public getHour$() {
        return this.hour$;
    }

    /**
     * Get the display time in day accuracy
     */
    public getDay$() {
        return this.day$;
    }
}
