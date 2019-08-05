import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ClockService } from '../../service/clock.service';
import { OWMCityData, OWMForecast } from '../../service/open-weather-maps.model';
import { OpenWeatherMapsService } from '../../service/open-weather-maps.service';

@Component({
    selector: 'app-city-weather',
    templateUrl: './city-weather.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityWeatherComponent {
    public cityId$: Observable<string>;
    public weather$: Observable<OWMCityData>;
    public forecast$: Observable<OWMForecast[]>;
    public now$: Observable<number>;

    constructor(private clock: ClockService, private route: ActivatedRoute, private weather: OpenWeatherMapsService) {
        this.cityId$ = this.route.paramMap.pipe(
            map(params => params.get('cityId') || ''),
            filter(cityId => !!cityId),
            distinctUntilChanged(),
        );
        this.weather$ = this.cityId$.pipe(switchMap(cityId => this.weather.getWeatherByCityId$(cityId)));
        this.forecast$ = this.cityId$.pipe(switchMap(cityId => this.weather.getForecastByCityId$(cityId)));
        this.now$ = this.clock.getMinute$();
    }
}
