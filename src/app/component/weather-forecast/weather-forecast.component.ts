import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { OWMForecast } from '../../service/open-weather-maps.model';
import { weatherEmoji } from '../../service/open-weather-maps.util';
import { kelvinToCelcius } from '../../util/temperature';
import { iso8601, MILLISECONDS_IN_SECOND } from '../../util/time';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'lib-weather-forecast',
    templateUrl: './weather-forecast.component.html',
    styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnChanges {
    @Input('forecast') public forecast: OWMForecast[];

    public tempAvg: number = 0;
    public tempRange: number = 0;

    public ngOnChanges() {
        if (this.forecast && this.forecast.length > 0) {
            const temperatures = this.forecast.map(forecast => forecast.main.temp);

            const min = temperatures.reduce((a, b) => Math.min(a, b));
            const max = temperatures.reduce((a, b) => Math.max(a, b));

            this.tempAvg = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
            this.tempRange = max - min;
        } else {
            this.tempAvg = 0;
            this.tempRange = 0;
        }
    }

    /*
     * Convert a UNIX epoch timestamp in seconds to a ISO8601 datetime string
     */
    public unixTimeToISO8601(timestamp: number) {
        return new Date(timestamp * MILLISECONDS_IN_SECOND).toISOString();
    }

    /**
     * Get the timestamp of moment for which the weather forecast applies.
     *
     * Utility function for `trackBy` in `ngFor`
     */
    public getForecastTime(forecast: OWMForecast) {
        return forecast.dt;
    }

    public deviation(temp: number) {
        return (temp - this.tempAvg) / this.tempRange;
    }

    public formatPercentage(pct: number): string {
        return `${Math.round(pct * 100)}%`;
    }

    public formatTemperature(kelvin: number): string {
        return `${Math.round(kelvinToCelcius(kelvin))}°`;
    }

    public iso8601 = iso8601;

    public weatherEmoji = weatherEmoji;
}
