import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { longWindDirection, shortWindDirection, speedToBeaufort } from '../../util/wind';

/**
 * Initial rotation of the arrow. The Unicode right arrows are rotated 90 degrees.
 */
const ARROW_ROTATION = 90;

/**
 * When the wind comes from one direction, the arrow should point in the opposite direction
 */
const REVERSE_ROTATION = 180;

@Component({
    selector: 'lib-weather-vane',
    templateUrl: './weather-vane.component.html',
    styleUrls: ['./weather-vane.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherVaneComponent {
    /*
     * Wind direction in degrees, 0 degrees being north.
     */
    @Input('wind-direction') public windDirection: number;

    /*
     * Optionally define another Unicode right arrow.
     */
    @Input('wind-icon') public windIcon: string = '➤';

    /*
     * Wind speed in meter per second
     */
    @Input('wind-speed') public windSpeed: number;

    // TODO: Calculate i18n labels based on `windDirection`
    public directionAbbr: string = 'SSW';
    public directionLongDesc: string = 'south by southwest';

    public cssRotateDeg = (deg: number): string => `rotate(${deg - ARROW_ROTATION - REVERSE_ROTATION}deg)`;

    public formatWindSpeed = speedToBeaufort;
    public formatShortDirection = shortWindDirection;
    public formatLongDirection = longWindDirection;

    public formatSummary(windSpeed: number, windDirection: number) {
        return `wind: ${this.formatWindSpeed(windSpeed)} Beaufort ${this.formatLongDirection(windDirection)}`;
    }
}
