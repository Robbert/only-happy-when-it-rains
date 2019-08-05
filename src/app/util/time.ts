export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const MILLISECONDS_IN_SECOND = 1000;
export const MILLISECONDS_IN_MINUTE = MILLISECONDS_IN_SECOND * SECONDS_IN_MINUTE;
export const MILLISECONDS_IN_HOUR = MILLISECONDS_IN_MINUTE * MINUTES_IN_HOUR;
export const MIILISECONDS_IN_DAY = MILLISECONDS_IN_HOUR * HOURS_IN_DAY;

/**
 * Round UNIX epoch timestamp in milliseconds to a specified accuracy
 */
export const roundTime = (time: number, accuracy: number): number => time - (time % accuracy);

/*
 * Convert a UNIX epoch timestamp in milliseconds to a ISO8601 datetime string
 */
export const iso8601 = (time: number): string => {
    try {
        return new Date(time).toISOString();
    } catch (e) {
        // When `time` is not a valid UNIX epoch time
        return '';
    }
};
