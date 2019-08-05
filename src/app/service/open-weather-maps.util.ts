const CLOUD_EMOJI = '\u2601\ufe0f';
const CLOUDS_RAIN_EMOJI = '\ud83c\udf27\ufe0f';
const CLOUDS_SNOW_EMOJI = '\ud83c\udf28\ufe0f';
const DROPLET_EMOJI = '\ud83d\udca7';
const FOG_EMOJI = '\ud83c\udf2b\ufe0f';
const SNOWFLAKE_EMOJI = '\u2744\ufe0f';
const SUN_CLOUD_EMOJI = '\ud83c\udf24\ufe0f';
const SUN_EMOJI = '\u2600\ufe0f';
const THUNDER_EMOJI = '\u26a1';
const THUNDER_RAIN_EMOJI = '\u26c8\ufe0f';
const TORNADO_EMOJI = '\ud83c\udf2a\ufe0f';

/**
 * Emoji variants for icons of various weather conditions
 *
 * Source for weather condition codes:
 * https://openweathermap.org/weather-conditions
 */
const WEATHER_EMOJI: { [index: string]: string } = {
    '200': THUNDER_RAIN_EMOJI,
    '201': THUNDER_RAIN_EMOJI,
    '202': THUNDER_RAIN_EMOJI,
    '210': THUNDER_EMOJI,
    '211': THUNDER_EMOJI,
    '212': THUNDER_EMOJI,
    '221': THUNDER_EMOJI,
    '230': THUNDER_RAIN_EMOJI,
    '231': THUNDER_RAIN_EMOJI,
    '232': THUNDER_RAIN_EMOJI,
    '300': DROPLET_EMOJI,
    '301': DROPLET_EMOJI,
    '302': CLOUDS_RAIN_EMOJI,
    '310': DROPLET_EMOJI,
    '311': CLOUDS_RAIN_EMOJI,
    '312': CLOUDS_RAIN_EMOJI,
    '313': CLOUDS_RAIN_EMOJI,
    '314': CLOUDS_RAIN_EMOJI,
    '320': CLOUDS_RAIN_EMOJI,
    '500': CLOUDS_RAIN_EMOJI,
    '501': CLOUDS_RAIN_EMOJI,
    '502': CLOUDS_RAIN_EMOJI,
    '503': CLOUDS_RAIN_EMOJI,
    '504': CLOUDS_RAIN_EMOJI,
    '511': SNOWFLAKE_EMOJI,
    '520': CLOUDS_RAIN_EMOJI,
    '521': CLOUDS_RAIN_EMOJI,
    '522': CLOUDS_RAIN_EMOJI,
    '531': CLOUDS_RAIN_EMOJI,
    '600': CLOUDS_SNOW_EMOJI,
    '601': CLOUDS_SNOW_EMOJI,
    '602': CLOUDS_SNOW_EMOJI,
    '611': CLOUDS_SNOW_EMOJI,
    '612': CLOUDS_SNOW_EMOJI,
    '613': CLOUDS_SNOW_EMOJI,
    '615': CLOUDS_SNOW_EMOJI,
    '616': CLOUDS_SNOW_EMOJI,
    '620': CLOUDS_SNOW_EMOJI,
    '621': CLOUDS_SNOW_EMOJI,
    '622': CLOUDS_SNOW_EMOJI,
    '701': FOG_EMOJI,
    '711': FOG_EMOJI,
    '721': FOG_EMOJI,
    '731': FOG_EMOJI,
    '741': FOG_EMOJI,
    '751': FOG_EMOJI,
    '761': FOG_EMOJI,
    '762': FOG_EMOJI,
    '771': FOG_EMOJI,
    '781': TORNADO_EMOJI,
    '800': SUN_EMOJI,
    '801': SUN_CLOUD_EMOJI,
    '802': CLOUD_EMOJI,
    '803': CLOUD_EMOJI,
    '804': CLOUD_EMOJI,
};

/**
 * Describe a weather condition code as Unicode emoji
 *
 * https://openweathermap.org/weather-conditions
 */
export const weatherEmoji = (code: string): string => WEATHER_EMOJI[code] || '';
