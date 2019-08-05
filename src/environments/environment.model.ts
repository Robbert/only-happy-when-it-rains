import { OWMEnvironment } from '../app/service/open-weather-maps.model';

export interface IEnvironment extends OWMEnvironment {
    production: boolean;
}
