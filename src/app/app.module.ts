import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesOverviewComponent } from './container/cities-overview/cities-overview.component';
import { CityWeatherComponent } from './container/city-weather/city-weather.component';
import { OWMTokenDialogComponent } from './container/owm-token-dialog/owm-token-dialog.component';
import { TimeAgoComponent } from './component/time-ago/time-ago.component';
import { TokenFormComponent } from './component/token-form/token-form.component';
import { WeatherForecastComponent } from './component/weather-forecast/weather-forecast.component';
import { WeatherReportComponent } from './component/weather-report/weather-report.component';
import { WeatherSummaryComponent } from './component/weather-summary/weather-summary.component';
import { WeatherVaneComponent } from './component/weather-vane/weather-vane.component';

@NgModule({
    declarations: [
        AppComponent,
        CitiesOverviewComponent,
        CityWeatherComponent,
        OWMTokenDialogComponent,
        TimeAgoComponent,
        TokenFormComponent,
        WeatherForecastComponent,
        WeatherReportComponent,
        WeatherSummaryComponent,
        WeatherVaneComponent,
    ],
    imports: [AppRoutingModule, BrowserModule, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
