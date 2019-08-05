# Angular demo application

This is a small weather application, inspired by my favourite weather apps for iOS: Apple's Weather and [CARROT](https://apps.apple.com/app/carrot-weather/id961390574). The weather is displayed for 5 random capital cities in the European Union.

<img width="479" alt="Weather for 5 European cities" src="https://user-images.githubusercontent.com/30694/62437132-47182500-b742-11e9-86c8-0dfad9721d7a.png">

## User Experience

I want to display the current weather in real-time, since OpenWeatherMaps frequently provides new data. The data in every screen should update automatically, and where possible the UI should smoothly transition to the new measurements and forecasts.

To make the user aware that the data is real-time, I will display a real-time indication of the freshness of the data: "Last updated: 13 minutes ago". This indication should be updated as time goes by.

<img width="479" alt="Weather forecast for Zagreb" src="https://user-images.githubusercontent.com/30694/62437086-0a4c2e00-b742-11e9-899e-279f6b0209e6.png">

I decided to rely on native touch gestures and browser UI to navigate back to a previous screen, instead of offering a "back button" in the app itself. User testing may cause me to reconsider this approach in the future.

## Architecture

- Angular and RxJS to provide a real-time user interface.
- All code is TypeScript with very strict settings in `tsconfig.json`, to increase the chance of detecting bugs during development.
- Separation between smart and presentational components, with the aim to make as much of the UI components reusable.
- `allTheThing$ | async`! Avoid any `subscribe()` calls to prevent performance degradation by forgetting to unsubscribe from Observables.
- I considered using the new Ivy rendering engine for Angular, but I couldn't use it yet because currently it appears to lack support for `AsyncPipe`.
- I really like Jest so I decided not to go with the test engine installed by Angular CLI.
- The main reason to use Angular CLI was to make the future upgrade to Angular 9 more effortless by being able to use `ng update`.
- Generally speaking, the fastest front-end is code a server-sider rendered page without JavaScript. That's why Angular server-side rendering is used to generate the initial rendering.

## Getting started

First install the application using:

```shell
npm ci
```

To start the application, run the following steps:

```shell
npm run build:ssr
npm run serve:ssr
```

After the steps above, the application should be available on: http://localhost:4000/

## Development

During development you can start the application using:

```shell
npm run dev
```

Then it should be available on: http://localhost:4200/

To run the unit tests once, run:

```shell
npm run test
```

## TODO

The major todo's are:

- Use [`TransferState`](https://angular.io/api/platform-browser/TransferState) to provide the 5 cities randomly picked by the server to the front-end. This fixes the short flash on page load where you can see the change from the initial 5 cities to a new set of 5 cities.
- Configure the OpenWeatherMaps API token via an environment variable instead of in code
- Improve code coverage
