import { ABSOLUTE_ZERO, formatCelcius, kelvinToCelcius } from './temperature';

/**
 * Degree sign (U+00B0)
 */
const DEGREE_SYMBOL = '°';

/**
 * Melting point of water in Kelvin
 */
const WATER_MELTING_POINT_KELVIN = 273.15;

/**
 * Melting point of water in degrees Celcius
 */
const WATER_MELTING_POINT_CELCIUS = 0;

/**
 * Boiling point of water in Kelvin
 */
const WATER_BOILING_POINT_KELVIN = 373.15;

/**
 * Boiling point of water in degrees Celcius
 */
const WATER_BOILING_POINT_CELCIUS = 100;

describe('temperature conversion from Kelvin to degrees Celcius', () => {
    it('should accurately convert the melting point of water', () => {
        const temperature = kelvinToCelcius(WATER_MELTING_POINT_KELVIN);

        expect(temperature).toBe(WATER_MELTING_POINT_CELCIUS);
    });

    it('should accurately convert the boiling point of water', () => {
        const temperature = kelvinToCelcius(WATER_BOILING_POINT_KELVIN);

        expect(temperature).toBe(WATER_BOILING_POINT_CELCIUS);
    });
});

describe('formatting temperature in Celcius', () => {
    it('should round the temperature to whole numbers', () => {
        const temperature = formatCelcius(ABSOLUTE_ZERO);

        expect(temperature).toContain('273');
        expect(temperature).not.toContain('15');
    });

    it('should include the symbol for degrees Celcius', () => {
        const temperature = formatCelcius(ABSOLUTE_ZERO);

        // Allow both separate characters as well as composed Unicode symbols
        const normalized = temperature.normalize('NFKD');

        expect(normalized).toContain(DEGREE_SYMBOL);
        expect(normalized).toContain('C');
    });
});
