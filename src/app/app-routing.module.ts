import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesOverviewComponent } from './container/cities-overview/cities-overview.component';
import { CityWeatherComponent } from './container/city-weather/city-weather.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'weather',
        pathMatch: 'full',
    },
    {
        path: 'weather',
        component: CitiesOverviewComponent,
    },
    {
        path: 'weather/city/:cityId',
        component: CityWeatherComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
