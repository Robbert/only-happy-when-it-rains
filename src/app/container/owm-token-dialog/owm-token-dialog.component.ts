import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenWeatherMapsService } from '../../service/open-weather-maps.service';

@Component({
    selector: 'app-owm-token-dialog',
    templateUrl: './owm-token-dialog.component.html',
    styleUrls: ['./owm-token-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OWMTokenDialogComponent {
    constructor(private router: Router, private weather: OpenWeatherMapsService) {}

    public getValidator() {
        return (token: string) => this.weather.isValidToken$(token);
    }

    public setToken(token: string) {
        this.weather.setToken(token);

        // TODO: Redirect to previously guarded page instead of redirecing to home page
        this.router.navigate(['']);
    }
}
