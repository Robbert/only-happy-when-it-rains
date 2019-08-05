import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shuffle } from '../util/array';
import { City } from './location.service.model';

/**
 * Capital cities of European Union member states
 * */
const EU_CAPITAL_CITIES: City[] = [
    { name: 'Amsterdam', id: '2759794' },
    { name: 'Athens', id: '264371' },
    { name: 'Berlin', id: '2950159' },
    { name: 'Bratislava', id: '3060972' },
    { name: 'Brussels', id: '2800866' },
    { name: 'Bucharest', id: '683506' },
    { name: 'Budapest', id: '3054643' },
    { name: 'Copenhagen', id: '2618425' },
    { name: 'Dublin', id: '2964574' },
    { name: 'Helsinki', id: '658225' },
    { name: 'Lisbon', id: '2267057' },
    { name: 'Ljubljana', id: '3196359' },
    { name: 'London', id: '2643743' },
    { name: 'Luxembourg', id: '2960316' },
    { name: 'Madrid', id: '3117735' },
    // OpenWeatherMaps has no ID for "Nicosia", capital of Cyprus
    // { name: 'Nicosia', id: '' },
    { name: 'Paris', id: '2988507' },
    { name: 'Prague', id: '3067696' },
    { name: 'Riga', id: '456172' },
    { name: 'Rome', id: '6539761' },
    { name: 'Sofia', id: '727011' },
    { name: 'Stockholm', id: '2673730' },
    { name: 'Tallinn', id: '588409' },
    { name: 'Valletta', id: '2562305' },
    { name: 'Vienna', id: '2761369' },
    { name: 'Vilnius', id: '593116' },
    { name: 'Warsaw', id: '756135' },
    { name: 'Zagreb', id: '3186886' },
];

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    public locations$: Observable<City[]>;

    constructor() {
        // Randomly pick 5 capital cities of EU member states
        const randomFiveCities = shuffle(EU_CAPITAL_CITIES).slice(0, 5);

        this.locations$ = new BehaviorSubject(randomFiveCities);
    }
}
