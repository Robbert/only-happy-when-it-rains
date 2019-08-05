import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesOverviewComponent } from './container/cities-overview/cities-overview.component';
import { CityWeatherComponent } from './container/city-weather/city-weather.component';
import { OWMTokenDialogComponent } from './container/owm-token-dialog/owm-token-dialog.component';
import { TokenGuardService } from './service/token-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'full',
    },
    {
        path: 'weather',
        component: CitiesOverviewComponent,
        canActivate: [TokenGuardService],
    },
    {
        path: 'weather/city/:cityId',
        component: CityWeatherComponent,
        canActivate: [TokenGuardService],
    },
    {
        path: 'token',
        component: OWMTokenDialogComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
