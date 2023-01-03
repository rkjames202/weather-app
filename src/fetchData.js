const API_KEY = "09a37c2bc77e93fb02077d4369a947f3";
const processedData = {};

/**
 *
 * @param {number} time - unix time in seconds
 * @returns time relative to time passed as parameter
 */
function calculateTime(localTime, timezone) {
  const date = new Date();

  // Convert local time offset to milliseconds
  const localOffset = date.getTimezoneOffset() * 60000;

  // Get UTC time in milliseconds
  const utcTime = localTime * 1000 + localOffset;

  // Convert timezone shift (responseData.timezone) to milliseconds and get local time
  const locationTime = utcTime + 1000 * timezone;

  return new Date(locationTime);
}

function getDates(responseData) {
  const times = {};
  times.current = calculateTime(responseData.dt, responseData.timezone);
  times.sunrise = calculateTime(
    responseData.sys.sunrise,
    responseData.timezone
  );
  times.sunset = calculateTime(responseData.sys.sunset, responseData.timezone);

  return { ...times };
}

function getLocation(responseData) {
  return responseData.name;
}

function convertToFahrenheit(temp) {
  return (temp * (9 / 5) - 459.67).toFixed();
}

function convertToCelsius(temp) {
  return (temp - 273.15).toFixed();
}

function getTemps(responseData) {
  const temps = {};

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

  return { ...temps };
}

function getHumidity(responseData) {
  return responseData.main.humidity;
}

function getWeatherDesc(responseData) {
  return responseData.weather[0].description;
}

function getWindSpeed(responseData) {
  const speed = {};

  // Convert meters/second to miles/hour
  speed.mph = (responseData.wind.speed * 2.236936).toFixed();
  // Conver meters/second to km/hour
  speed.km = (responseData.wind.speed * 3.6).toFixed();

  return { ...speed };
}

async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}

function processData(responseData) {
  processedData.location = getLocation(responseData);
  processedData.temps = getTemps(responseData);
  processedData.humidity = getHumidity(responseData);
  processedData.desc = getWeatherDesc(responseData);
  processedData.wind = getWindSpeed(responseData);
  processedData.dates = getDates(responseData);

  return { ...processedData };
}

async function createQueryCall(query) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${API_KEY}`;

  const responseData = await fetchData(url);

  return processData(responseData);
}

export default createQueryCall;
export { processedData };
