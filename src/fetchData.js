// API key
const API_KEY = "09a37c2bc77e93fb02077d4369a947f3";
// Object containing all of the processed data from API call
const processedData = {};

/**
 * Calculate the time of the location
 *
 * @param {*} localTime - local time of user in unix
 * @param {*} timezone - shift in seconds from UTC time
 * @returns - local time of location
 */
function calculateTime(localTime, timezone) {
  // Create date object
  const date = new Date();

  // Convert local time offset to milliseconds (from minutes to seconds (*60) to milliseconds (*1000) 60*1000 = 60000)
  const localOffset = date.getTimezoneOffset() * 60000;

  // Get UTC time in milliseconds
  const utcTime = localTime * 1000 + localOffset;

  // Add utc to timezone shift (in milliseconds) to get final time
  const locationTime = utcTime + 1000 * timezone;

  return new Date(locationTime);
}

/**
 * Get local dates of location
 *
 * @param {object} responseData - raw data from API call
 * @returns - an object containing all of the times
 */
function getDates(responseData) {
  // Object to store dates
  const times = {};
  // Calculate the current, sunrise, and sunset time of location
  times.current = calculateTime(responseData.dt, responseData.timezone);
  times.sunrise = calculateTime(
    responseData.sys.sunrise,
    responseData.timezone
  );
  times.sunset = calculateTime(responseData.sys.sunset, responseData.timezone);

  // Return copy of times object
  return { ...times };
}

/**
 * Get name of location
 *
 * @param {object} responseData - raw data from API call
 * @returns - name of location
 */
function getLocation(responseData) {
  return responseData.name;
}

/**
 * Convert temperature to fahrenheit
 *
 * @param {number} temp - temperature to be converted
 * @returns
 */
function convertToFahrenheit(temp) {
  return (temp * (9 / 5) - 459.67).toFixed();
}

/**
 * Convert temperature to celsius
 *
 * @param {number} temp - temperature to be converted
 * @returns
 */
function convertToCelsius(temp) {
  return (temp - 273.15).toFixed();
}

/**
 * Get temperatures of location
 *
 * @param {object} responseData - raw data from API call
 * @returns
 */
function getTemps(responseData) {
  // Object to store temperatures
  const temps = {};

  // Store fahrenheit and celsius temps in each property as a separate object
  temps.current = {
    fahrenheit: convertToFahrenheit(responseData.main.temp),
    celsius: convertToCelsius(responseData.main.temp),
  };

  temps.feelsLike = {
    fahrenheit: convertToFahrenheit(responseData.main.feels_like),
    celsius: convertToCelsius(responseData.main.feels_like),
  };

  temps.high = {
    fahrenheit: convertToFahrenheit(responseData.main.temp_max),
    celsius: convertToCelsius(responseData.main.temp_max),
  };

  temps.low = {
    fahrenheit: convertToFahrenheit(responseData.main.temp_min),
    celsius: convertToCelsius(responseData.main.temp_min),
  };

  // Return copy of temps object
  return { ...temps };
}

/**
 * Get humidity in % of location
 *
 * @param {object} responseData - raw data from API call
 * @returns
 */
function getHumidity(responseData) {
  return responseData.main.humidity;
}

/**
 * Get description of weather condition
 *
 * @param {object} responseData - raw data from API call
 * @returns
 */
function getWeatherDesc(responseData) {
  return responseData.weather[0].description;
}

/**
 * Get wind speeds
 */
function getWindSpeed(responseData) {
  // Object to store both units of speed
  const speed = {};

  // Convert meters/second to miles/hour
  speed.mph = (responseData.wind.speed * 2.236936).toFixed();
  // Conver meters/second to km/hour
  speed.km = (responseData.wind.speed * 3.6).toFixed();

  // Return copy of speed object
  return { ...speed };
}

/**
 * Makes API call and returns parsed body of response
 *
 * @param {string} url - URL representing the endpoint of the API
 * @returns - parsed body of the response
 */
async function fetchData(url) {
  // Store fulfillment value of API call, a response object
  const response = await fetch(url);
  return response.json();
}

/**
 * Calls all necessary functions to process data from 
 * API call
 * 
 * @param {object} responseData - raw data from API call 
 * @returns - all of the data need from the API call processed 
 */
function processData(responseData) {
  processedData.location = getLocation(responseData);
  processedData.temps = getTemps(responseData);
  processedData.humidity = getHumidity(responseData);
  processedData.desc = getWeatherDesc(responseData);
  processedData.wind = getWindSpeed(responseData);
  processedData.dates = getDates(responseData);

  return { ...processedData };
}

/**
 * Makes an API call with user's query
 * 
 * @param {string} query 
 * @returns - the processed data from API call 
 */
async function createQueryCall(query) {
  // URL with user's query
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${API_KEY}`;

  // Parsed body of API's response
  const responseData = await fetchData(url);

  return processData(responseData);
}

export default createQueryCall;
export { processedData };
