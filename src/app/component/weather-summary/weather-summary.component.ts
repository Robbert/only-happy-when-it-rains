import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OWMCityData } from '../../service/open-weather-maps.model';
import { formatCelcius, kelvinToCelcius } from '../../util/temperature';

@Component({
    selector: 'lib-weather-summary',
    templateUrl: './weather-summary.component.html',
    styleUrls: ['./weather-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherSummaryComponent {
    @Input('weather') public weather: OWMCityData;

    /**
     * Format temperature in Kelvin as degrees Celcius
     */
    public formatTemperature(kelvin: number): string {
        return formatCelcius(kelvinToCelcius(kelvin));
    }
}
