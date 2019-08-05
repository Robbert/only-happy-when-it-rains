/**
 * Specify what Angular environment settings the service will access.
 */
export interface OWMEnvironment {
    openWeatherMapsToken?: string;
}

/*
 * This interface definition has partly been reverse engineered by inspecting the
 * API responses, because the OpenWeatherMaps documentation appears to lack
 * a full description of all responses, and no technical endpoint definition
 * appears to be provided in Swagger or any such format.
 *
 * https://openweathermap.org/current#current_JSON
 */

export interface OWMLatLon {
    /**
     * Latitude, in degrees
     */
    lat: number;

    /**
     * Longitude, in degrees
     */
    lon: number;
}

export interface OWMClouds {
    /**
     * Cloud cover, percentage between 0% and 100%
     */
    all: number;
}

export interface OWMWind {
    /**
     * Wind speed in meters per second.
     * Optionally available in in miles per hour.
     */
    speed: number;

    /**
     * Wind direction in degrees.
     * North: 0 deg
     * West: 90 deg
     * South: 180 deg
     * East: 270 deg
     */
    deg: number;
}

export interface OWMMainWeather {
    /**
     * Temperature in Kelvin
     * Optionally available in degrees Celcius or degrees Fahrenheit.
     * Returns the average temperature for large cities have multiple measurements for different locations.
     */
    temp: number;

    /**
     * Atmospheric pressure in hectopascal (hPa)
     *
     * For more information, see Wikipedia:
     * https://en.wikipedia.org/wiki/Pascal_(unit)
     * https://en.wikipedia.org/wiki/Bar_(unit)
     */
    pressure: number;

    /**
     * Humidity, percentage between 0% and 100%
     */
    humidity: number;

    /**
     * Lowest measured temperature, for large location areas with multiple measurements.
     */
    temp_min: number;

    /**
     * Highest measured temperature, for large location areas with multiple measurements.
     */
    temp_max: number;
}

export interface OWMForecastWeather extends OWMMainWeather {
    /**
     * Atmospheric pressure at sea level in hectopascal (hPa)
     */
    sea_level: number;

    /**
     * Atmospheric pressure at ground level in hectopascal (hPa)
     */
    grnd_level: number;

    /**
     * Internal value
     */
    temp_kf: number;
}

export interface OWMWeatherDescription {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface OWMCityData {
    /**
     * City ID
     */
    id: number;

    /**
     * City name
     */
    name: string;

    /**
     * Last modified date, UNIX epoch time in seconds
     */
    dt: number;

    coord: OWMLatLon;
    sys: {
        /**
         * ISO 3166 country code
         */
        country: string;

        /**
         * Deviation from UTC in seconds
         */
        timezone: number;

        /**
         * Sunrise time, UNIX epoch time in seconds
         */
        sunrise: number;

        /**
         * Sunset time, UNIX epoch time in seconds
         */
        sunset: number;
    };
    weather: [OWMWeatherDescription];
    main: OWMMainWeather;
    visibility: number;
    wind: OWMWind;
    clouds: OWMClouds;
}

export interface OWMForecast {
    /**
     * City ID
     */
    id: number;

    /**
     * City name
     */
    name: string;

    /**
     * Last modified date, UNIX epoch time in seconds
     */
    dt: number;

    weather: [OWMWeatherDescription];

    clouds: OWMClouds;

    wind: OWMWind;

    main: OWMForecastWeather;
}

export interface OWMGroupResponse<T> {
    /**
     * Internal value
     */
    cnt: number;

    list: T[];
}

export interface OWMResponse {
    /**
     * Internal value. Status code that largely follows HTTP status codes.
     *
     * - 200 for OK responses
     * - 401 for (amongst other situations) an invalid API key
     * - 429 for exceeding the API usage limit
     *
     * For more info on API limits:
     * https://openweathermap.org/appid#Accesslimitation
     */
    cod: string;

    /**
     * Internal value. Human readable status message in English.
     */
    message: string | number;
}
