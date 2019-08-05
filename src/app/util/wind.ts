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
