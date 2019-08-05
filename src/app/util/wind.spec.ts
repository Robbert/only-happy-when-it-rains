import { speedToBeaufort } from './wind';

const MAX_BEAUFORT = 12;

describe('formatting wind speed on the scale of Beaufort', () => {
    it('should be able to format every speed on the scale', () => {
        /**
         * Beafort numbers 0 to 12
         */
        const beaufortValues: number[] = new Array(13).map((_, beaufortNumber) => beaufortNumber);

        /**
         * Array of wind speeds in meters per second, varying from
         * 0 m/s to to hurricane speeds (42 m/s)
         */
        const speeds = new Array(42).map((_, index) => index);

        // Format every windspeed from 0 to hurricane speed
        const beaufortSpeeds = speeds.map(speedToBeaufort);

        // Check if every number on the scale of beaufort is represented
        const scaleIsRepresented: boolean[] = beaufortValues.map(beaufortNumber =>
            beaufortSpeeds.includes(beaufortNumber),
        );

        expect(scaleIsRepresented.length).toEqual(13);
        expect(scaleIsRepresented.every(value => value)).toBe(true);
    });

    it('should not exceed 12 on the scale for speeds greatly exceeding hurricane force', () => {
        const beaufort = speedToBeaufort(Number.MAX_SAFE_INTEGER);

        expect(beaufort).toBe(MAX_BEAUFORT);
    });

    it('should handle negative the numbers similar to positive numbers', () => {
        const beaufort = speedToBeaufort(Number.MIN_SAFE_INTEGER);

        expect(beaufort).toBe(MAX_BEAUFORT);
    });
});
