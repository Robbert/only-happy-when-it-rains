import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeAgoComponent } from './component/time-ago/time-ago.component';
import { WeatherForecastComponent } from './component/weather-forecast/weather-forecast.component';
import { WeatherSummaryComponent } from './component/weather-summary/weather-summary.component';
import { WeatherVaneComponent } from './component/weather-vane/weather-vane.component';

@NgModule({
    declarations: [
        AppComponent,
        TimeAgoComponent,
        WeatherForecastComponent,
        WeatherSummaryComponent,
        WeatherVaneComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, CommonModule, HttpClientModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
