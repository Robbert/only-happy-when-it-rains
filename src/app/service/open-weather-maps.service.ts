import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, timer } from 'rxjs';
import { catchError, combineLatest, map, publish, refCount, shareReplay, startWith, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { MILLISECONDS_IN_HOUR, MILLISECONDS_IN_MINUTE } from '../util/time';
import { OWMCityData, OWMForecast, OWMGroupResponse } from './open-weather-maps.model';

// This URL can be used elsewhere to configure `Content-Security-Policy`
export const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// Parts to generate endpoint URLs
const GROUP_PATH = 'group';
const WEATHER_PATH = 'weather';
const FORECAST_PATH = 'forecast';
const FIND_PARAM = 'find';
const TOKEN_PARAM = 'appid';
const CITY_ID_PARAM = 'id';

/*
 * Amsterdam is used as test city.
 * Use a number instead of a string because the API returns city IDs as number,
 * so this way we can safely use `===` for exact equivalence.
 */
const EXAMPLE_CITY_ID = 2643741;

/**
 * Interval at which new weather measurements are published
 */
const CURRENT_WEATHER_INTERVAL = 10 * MILLISECONDS_IN_MINUTE;

/**
 * Interval at which new weather forecasts are published
 */
const FORECAST_INTERVAL = 3 * MILLISECONDS_IN_HOUR;

/*
 * # Temperature values
 *
 * The REST API supports adding `?units=metric`, but I prefer having the values in Kelvin
 * because for i18n it makes a non-biased starting point to be able to convert to either
 * Celcius or Fahrenheit.
 */
@Injectable({
    providedIn: 'root',
})
export class OpenWeatherMapsService {
    private token$: ReplaySubject<string>;

    /*
     * The `hasToken$` observable is an indicition wether any successful calls to the
     * API can be made. When no token is configured, the returned observables not complete
     * until a token is provided.
     */
    public hasToken$: Observable<boolean>;

    constructor(private http: HttpClient) {
        this.token$ = new ReplaySubject(1);
        this.hasToken$ = this.token$.pipe(
            map(() => true),
            startWith(false),
            shareReplay(1),
        );

        if (environment.openWeatherMapsToken) {
            this.setToken(environment.openWeatherMapsToken);
        }
    }

    /*
     * Configuring the OpenWeatherMaps API key is required to retrieve results from the API.
     *
     * To obtain an API key, you need to sign up first:
     * https://openweathermap.org/api
     *
     * After signing in, your API keys are listed here:
     * https://home.openweathermap.org/api_keys
     *
     * It is recommended to create a separate API keys for every deployment environment,
     * to be able to revoke one quickly in case of unforeseen circumstances that might
     * cause exceeding the call limits.
     */
    public setToken(token: string) {
        if (!token) {
            throw new TypeError('Token cannot be an empty string');
        }

        this.token$.next(token);
    }

    public isValidToken$(token: string): Observable<boolean> {
        /*
         * There doesn't appear to be an endpoint that supports checking the validity
         * of an API key, inspecting the usage limits, or anything like that.
         *
         * As workaround we must try an actual weather API. The current URL is chosen
         * because it has a small payload, loads quickly, and counts as only one
         * API call toward the usage limits.
         */
        const url = `${BASE_URL}${WEATHER_PATH}`;
        const params = new HttpParams().set(CITY_ID_PARAM, String(EXAMPLE_CITY_ID)).set(TOKEN_PARAM, token);

        return this.http.get<OWMCityData>(url, { params }).pipe(
            map(() => true),
            catchError(() => of(false)),
        );
    }

    /*
     * API documentation:
     * https://openweathermap.org/current
     *
     * For example:
     * https://api.openweathermap.org/data/2.5/weather?find=Amsterdam
     */
    public getWeatherByCityName$(query: string): Observable<OWMCityData> {
        const url = `${BASE_URL}${WEATHER_PATH}`;
        const params = new HttpParams().set(FIND_PARAM, query);

        return this.token$.pipe(
            combineLatest(timer(0, CURRENT_WEATHER_INTERVAL), token => token),
            switchMap((token: string) => this.http.get<OWMCityData>(url, { params: params.set(TOKEN_PARAM, token) })),
            publish(),
            refCount(),
        );
    }

    /*
     * API documentation:
     * https://openweathermap.org/current
     *
     * For example:
     * https://api.openweathermap.org/data/2.5/weather?id=2643741
     */
    public getWeatherByCityId$(cityId: string): Observable<OWMCityData> {
        const url = `${BASE_URL}${WEATHER_PATH}`;
        const params = new HttpParams().set(CITY_ID_PARAM, cityId);

        return this.token$.pipe(
            combineLatest(timer(0, CURRENT_WEATHER_INTERVAL), token => token),
            switchMap(token => this.http.get<OWMCityData>(url, { params: params.set(TOKEN_PARAM, token) })),
            publish(),
            refCount(),
        );
    }

    /*
     * API documentation:
     * https://openweathermap.org/current
     *
     * For example:
     * http://api.openweathermap.org/data/2.5/group?id=2643741
     */
    public getWeatherByCityIds$(cityIds: string[]): Observable<OWMCityData[]> {
        const url = `${BASE_URL}${GROUP_PATH}`;
        const params = new HttpParams().set(CITY_ID_PARAM, cityIds.join(','));

        return this.token$.pipe(
            combineLatest(timer(0, CURRENT_WEATHER_INTERVAL), token => token),
            switchMap(token =>
                this.http.get<OWMGroupResponse<OWMCityData>>(url, { params: params.set(TOKEN_PARAM, token) }),
            ),
            map(({ list }: OWMGroupResponse<OWMCityData>) => list),
            publish(),
            refCount(),
        );
    }

    /*
     * API Documentation:
     * https://openweathermap.org/forecast5
     *
     * For example:
     * https://api.openweathermap.org/data/2.5/forecast?id=2643741
     */
    public getForecastByCityId$(query: string): Observable<OWMForecast[]> {
        const url = `${BASE_URL}${FORECAST_PATH}`;
        const params = new HttpParams().set(CITY_ID_PARAM, query);

        return this.token$.pipe(
            combineLatest(timer(0, FORECAST_INTERVAL), token => token),
            switchMap(token =>
                this.http.get<OWMGroupResponse<OWMForecast>>(url, { params: params.set(TOKEN_PARAM, token) }),
            ),
            map(group => group.list),
            publish(),
            refCount(),
        );
    }
}
