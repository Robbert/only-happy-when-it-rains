import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OWMCityData, OWMForecast } from '../../service/open-weather-maps.model';
import { formatCelcius, kelvinToCelcius } from '../../util/temperature';

@Component({
    selector: 'lib-weather-report',
    templateUrl: './weather-report.component.html',
    styleUrls: ['./weather-report.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherReportComponent {
    @Input('weather') public weather: OWMCityData;
    @Input('forecast') public forecast: OWMForecast;
    @Input('now') public now: number;

    /**
     * Format temperature in Kelvin as degrees Celcius
     */
    public formatTemperature(kelvin: number): string {
        return formatCelcius(kelvinToCelcius(kelvin));
    }
}
