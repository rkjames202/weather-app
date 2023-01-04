import format from "date-fns/format";

function displayLocation(location) {
  const locationPara = document.querySelector(".location");
  locationPara.innerText = location;
}

/**
 * Display weather description
 *
 * @param {string} desc - description of weather conditions
 */
function displayWeatherdesc(desc) {
  // Capitalize first letter of each word
  const newDesc = desc
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Display description of weather condition
  const descPara = document.querySelector(".description");
  descPara.innerText = newDesc;
}

/**
 * Displays the current date of the location
 *
 * @param {object} dates - object containing the current, sunrise, and sunset Date objects of location
 */
function displayDate(dates) {
  // Format the current date
  const formattedDate = format(dates.current, "EEEE, MMM do ''yy");
  // Display the current date
  const datePara = document.querySelector(".date");
  datePara.innerText = formattedDate;
}

/**
 * Display humidity of location
 *
 * @param {number} humidity - current humidity % of location
 */
function displayHumidity(humidity) {
  // Display humidity
  const humidityPara = document.querySelector(".humidity");
  humidityPara.innerText = `Humidity: ${humidity}%`;
}

/**
 * Display wind speed of location
 *
 * @param {object} wind - object containing the mph and km/h speed of wind gust
 * @param {string} option - option specifying which unit to display
 */
function displayWinds(wind, option) {
  let metric;
  // Unit that will be displayed next to wind speed
  let metricTag;

  // Test for mph or km option
  if (option === "mph") {
    metric = "mph";
    metricTag = "mph";
  } else if (option === "km") {
    metric = "km";
    metricTag = "km/h";
  }

  // Display wind speed
  const windSpeedPara = document.querySelector(".wind");
  windSpeedPara.innerText = `Wind Speed: ${wind[metric]} ${metricTag}`;
}

/**
 * Display temperatures of location
 *
 * @param {object} temps - object containing the current, 'feels like' temp and high/low temp of location
 * @param {string} option -option specifying which unit to display
 */
function displayTemps(temps, option) {
  let scale;

  // Test for fahrenheit or celsius options
  if (option === "f") {
    scale = "fahrenheit";
  } else if (option === "c") {
    scale = "celsius";
  }

  // Display the temperatures along the appropriate unit (option capitalized)
  const currentTempPara = document.querySelector(".current-temp");
  currentTempPara.innerText = `${
    temps.current[scale]
  } °${option.toUpperCase()}`;

  const feelsLikeTempPara = document.querySelector(".feels-like-temp");
  feelsLikeTempPara.innerText = `Feels Like: ${
    temps.feelsLike[scale]
  }°${option.toUpperCase()}`;

  const highTempPara = document.querySelector(".high-temp");
  highTempPara.innerText = `High: ${
    temps.high[scale]
  } °${option.toUpperCase()}`;

  const lowTempPara = document.querySelector(".low-temp");
  lowTempPara.innerText = `Low: ${temps.low[scale]} °${option.toUpperCase()}`;
}

/**
 * Display the current, sunrise, and sunset times
 *
 * @param {object} dates - object containing the current, sunrise, and sunset Date objects of location
 */
function displayTimes(dates) {
  const currentTime = document.querySelector(".current-time");
  // Use ONLY the times of the date objects
  currentTime.innerText = format(dates.current, "p");

  const sunriseTime = document.querySelector(".sunrise-time");
  sunriseTime.innerText = `Sunrise: ${format(dates.sunrise, "p")}`;

  const sunsetTime = document.querySelector(".sunset-time");
  sunsetTime.innerText = `Sunset: ${format(dates.sunset, "p")}`;
}

/**
 * Display weather icon for current weather condition and time
 * of day.
 *
 * @param {object} responseData - processed data from API call
 */
function displayWeatherIcon(responseData) {
  // Weather description
  const weatherDesc = responseData.desc;
  // Hours of the current time
  const currentHours = new Date(responseData.dates.current).getHours();
  // Hours of the sunset time
  const sunsetHours = new Date(responseData.dates.sunset).getHours();
  // Hours of the sunrise time
  const sunriseHours = new Date(responseData.dates.sunrise).getHours();

  let timeofDay;
  // If current time is before sunset and after sunrise, assume it's day time
  if (currentHours <= sunsetHours && currentHours >= sunriseHours) {
    timeofDay = "day";
  } else {
    // Otherwise, assume it's night
    timeofDay = "night";
  }

  // Change the weather icon depending on the time of day and weather description
  const icon = document.querySelector(".weather-icon-wrapper i");
  if (weatherDesc.includes("thunderstorm")) {
    icon.className = "fa-solid fa-cloud-bolt";
  } else if (weatherDesc.includes("rain")) {
    icon.className = "fa-solid fa-cloud-rain";
  } else if (weatherDesc.includes("snow")) {
    icon.className = "fa-regular fa-snowflake";
  } else if (weatherDesc.includes("clouds") && timeofDay === "day") {
    icon.className = "fa-solid fa-cloud-sun";
  } else if (weatherDesc.includes("clouds") && timeofDay === "night") {
    icon.className = "fa-solid fa-cloud-moon";
  } else if (weatherDesc.includes("clear") && timeofDay === "day") {
    icon.className = "fa-solid fa-sun";
  } else if (weatherDesc.includes("clear") && timeofDay === "night") {
    icon.className = "fa-solid fa-moon";
  } else if (weatherDesc.includes("mist") || weatherDesc.includes("fog")) {
    icon.className = "fa-solid fa-smog";
  } else if (weatherDesc.includes("tornado")) {
    icon.className = "fa-solid fa-tornado";
  }
}

/**
 * Display error message and clear input
 */
function displayErrorMsg() {
  const errorMsg = document.querySelector(".error-msg");
  const input = document.querySelector("input");

  errorMsg.style.visibility = "visible";
  input.value = "";
}

/**
 * Hide error message and clear input
 */
function hideErrorMsg() {
  const errorMsg = document.querySelector(".error-msg");
  const input = document.querySelector("input");

  errorMsg.style.visibility = "hidden";
  input.value = "";
}

/**
 * Display all necessary data on successful API call
 *
 * @param {object} responseData - processed data from API call
 */
function displayData(responseData) {
  const main = document.querySelector(".main");
  const toggleButton = document.querySelector(".toggle-units");

  // Show the main div and toggle units button
  main.style.visibility = "visible";
  toggleButton.style.visibility = "visible";

  // Display all necessary information
  displayLocation(responseData.location);
  displayWeatherdesc(responseData.desc);
  displayDate(responseData.dates);
  displayTimes(responseData.dates);
  displayHumidity(responseData.humidity);
  displayWeatherIcon(responseData);

  if (toggleButton.innerText.toLowerCase().includes("metric")) {
    displayTemps(responseData.temps, "f");
    displayWinds(responseData.wind, "mph");
  } else if (toggleButton.innerText.toLowerCase().includes("imperial")) {
    displayTemps(responseData.temps, "c");
    displayWinds(responseData.wind, "km");
  }

  // Hide error message on successful API call
  hideErrorMsg();
}

export default displayData;
export { displayErrorMsg, displayTemps, displayWinds };
