/**
 * Absolute zero in degrees Celcius
 */
export const ABSOLUTE_ZERO = -273.15;

/**
 * No-break space (U+00A0)
 */
export const NO_BREAK_SPACE = '\u00A0';

/**
 * Degree celcius symbol (U+2103)
 */
export const CELCIUS_SYMBOL = '\u2103';

/**
 * Convert temperature in Kelvin to degrees Celcius
 */
export const kelvinToCelcius = (kelvin: number): number => kelvin + ABSOLUTE_ZERO;

/**
 * Format temperature in degrees Celcius including unit symbol
 */
export const formatCelcius = (celcius: number): string => `${Math.round(celcius)}${NO_BREAK_SPACE}${CELCIUS_SYMBOL}`;
