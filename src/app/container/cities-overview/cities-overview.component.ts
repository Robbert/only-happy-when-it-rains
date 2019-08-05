import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LocationService } from '../../service/location.service';
import { City } from '../../service/location.service.model';
import { OWMCityData } from '../../service/open-weather-maps.model';
import { OpenWeatherMapsService } from '../../service/open-weather-maps.service';
import { stringSort } from '../../util/array';

@Component({
    selector: 'app-cities-overview',
    templateUrl: './cities-overview.component.html',
    styleUrls: ['./cities-overview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CitiesOverviewComponent {
    public locations$: Observable<City[]>;
    public weather$: Observable<OWMCityData[]>;

    constructor(private location: LocationService, private weather: OpenWeatherMapsService) {
        // Creating observables without subscribing doesn't have side effects,
        // so it is safe to include in the constructor instead of ngOnInit.
        this.weather$ = this.location.locations$.pipe(
            switchMap(locations => this.weather.getWeatherByCityIds$(locations.map(({ id }) => id))),

            // Sort the cities alphabetically
            map(weather => weather.sort((a, b) => stringSort(a.name, b.name))),
        );
    }

    /**
     * `trackBy` helper function for weather data
     */
    public getCityDataId({ id }: OWMCityData): number {
        return id;
    }
}
