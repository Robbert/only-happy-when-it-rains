import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { OpenWeatherMapsService } from './open-weather-maps.service';

@Injectable({
    providedIn: 'root',
})
export class TokenGuardService implements CanActivate {
    constructor(private weather: OpenWeatherMapsService, private router: Router) {}

    public canActivate() {
        return this.weather.hasToken$.pipe(
            tap(hasToken => {
                if (!hasToken) {
                    // Side-effect: navigate away from the page
                    this.router.navigate(['token']);
                }
            }),
        );
    }
}
