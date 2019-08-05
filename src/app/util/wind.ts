/**
 * Scale of Beaufort, sorted by number in ascending order
 *
 * The value represents the maximum wind speed in meters per second,
 * the index represents the respective number on the beaufort scale.
 *
 * Source:
 * https://en.wikipedia.org/wiki/Beaufort_scale
 */
const BEAUFORT_SCALE: number[] = [0.5, 1.5, 3.3, 5.5, 7.9, 10.7, 13.8, 17.1, 20.7, 24.4, 28.4, 32.6, Infinity];

/**
 * Convert a wind speed in meter per second to the Beaufort scale
 */
export const speedToBeaufort = (meterPerSec: number): number => {
    // Account for negative speeds
    const speed = Math.abs(meterPerSec);

    return BEAUFORT_SCALE.reduceRight(
        (state, maxSpeed, beaufortNumber) => (speed <= maxSpeed ? beaufortNumber : state),
        0,
    );
};

type CompassPoint = {
    id: string;
    azimuth: number;
    description: string;
    abbreviation: string;
};

/**
 * Compass point descriptions, with descriptions up to 45 degree accuracy
 *
 * The identifiers could be used for localization purposes.
 *
 * Source:
 * https://en.wikipedia.org/wiki/Points_of_the_compass#Compass_point_names
 */
const COMPASS_POINTS: CompassPoint[] = [
    {
        id: 'north',
        azimuth: 0,
        description: 'north',
        abbreviation: 'N',
    },
    {
        id: 'east',
        azimuth: 90,
        description: 'east',
        abbreviation: 'E',
    },
    {
        id: 'south',
        azimuth: 180,
        description: 'south',
        abbreviation: 'S',
    },
    {
        id: 'west',
        azimuth: 270,
        description: 'west',
        abbreviation: 'W',
    },
    {
        id: 'north-east',
        azimuth: 45,
        description: 'northeast',
        abbreviation: 'NE',
    },
    {
        id: 'south-east',
        azimuth: 135,
        description: 'southeast',
        abbreviation: 'SE',
    },
    {
        id: 'south-west',
        azimuth: 225,
        description: 'southwest',
        abbreviation: 'SW',
    },
    {
        id: 'north-west',
        azimuth: 315,
        description: 'northwest',
        abbreviation: 'NW',
    },
];

const FULL_CIRCLE = 360;

/**
 * Normalize direction to value between 0 and 360 degrees
 */
const normalizeDirection = (deg: number): number => (deg % FULL_CIRCLE) + (deg < 0 ? FULL_CIRCLE : 0);

/**
 * Get the compass closest to the compass direction in degrees
 */
const findCompassPoint = (direction: number): CompassPoint => {
    const deg = normalizeDirection(direction);

    return COMPASS_POINTS.reduce((closestPoint, point) =>
        Math.abs(deg - point.azimuth) < Math.abs(deg - closestPoint.azimuth) ? point : closestPoint,
    );
};

/**
 * Convert the wind direction in degrees to the compass point abbreviation
 */
export const shortWindDirection = (deg: number): string => findCompassPoint(deg).abbreviation;

/**
 * Convert the wind direction in degrees to the compass point description
 */
export const longWindDirection = (deg: number): string => findCompassPoint(deg).description;
