import format from "date-fns/format";

function displayLocation(location) {
  const locationPara = document.querySelector(".location");
  locationPara.innerText = location;
}

function displayWeatherdesc(desc) {
  // Capitalize first letter of each word
  const newDesc = desc
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const descPara = document.querySelector(".description");
  descPara.innerText = newDesc;
}
function displayDate(dates) {
  const formattedDate = format(dates.current, "EEEE, MMM do ''yy");
  const datePara = document.querySelector(".date");
  datePara.innerText = formattedDate;
}

function displayHumidity(humidity) {
  const humidityPara = document.querySelector(".humidity");
  humidityPara.innerText = `Humidity: ${humidity}%`;
}

function displayWinds(wind, option) {
  let metric;
  let metricTag;
  if (option === "mph") {
    metric = "mph";
    metricTag = "mph";
  } else if (option === "km") {
    metric = "km";
    metricTag = "km/h";
  }

  const windSpeedPara = document.querySelector(".wind");
  windSpeedPara.innerText = `Wind Speed: ${wind[metric]} ${metricTag}`;
}

function displayTemps(temps, option) {
  let scale;

  if (option === "f") {
    scale = "fahrenheit";
  } else if (option === "c") {
    scale = "celsius";
  }

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

function displayTimes(dates) {
  const currentTime = document.querySelector(".current-time");
  currentTime.innerText = format(dates.current, "p");

  const sunriseTime = document.querySelector(".sunrise-time");
  sunriseTime.innerText = `Sunrise: ${format(dates.sunrise, "p")}`;

  // Replace the "Sunset" & "Sunrise" with icons
  const sunsetTime = document.querySelector(".sunset-time");
  sunsetTime.innerText = `Sunset: ${format(dates.sunset, "p")}`;
}

function displayWeatherIcon(responseData) {
  const weatherDesc = responseData.desc;
  const currentHours = new Date(responseData.dates.current).getHours();
  const sunsetHours = new Date(responseData.dates.sunset).getHours();
  const sunriseHours = new Date(responseData.dates.sunrise).getHours();

  let timeofDay;
  if (currentHours <= sunsetHours && currentHours >= sunriseHours) {
    timeofDay = "day";
  } else {
    timeofDay = "night";
  }

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

function displayErrorMsg() {
  const errorMsg = document.querySelector(".error-msg");
  const input = document.querySelector("input");

  errorMsg.style.visibility = "visible";
  input.value = "";
}

function hideErrorMsg() {
  const errorMsg = document.querySelector(".error-msg");
  const input = document.querySelector("input");

  errorMsg.style.visibility = "hidden";
  input.value = "";
}

function displayData(responseData) {
  const main = document.querySelector(".main");
  const toggleButton = document.querySelector(".toggle-units");

  main.style.visibility = "visible";
  toggleButton.style.visibility = "visible";

  displayLocation(responseData.location);
  displayWeatherdesc(responseData.desc);
  displayDate(responseData.dates);
  displayTimes(responseData.dates);
  displayTemps(responseData.temps, "f");
  displayHumidity(responseData.humidity);
  displayWinds(responseData.wind, "mph");
  displayWeatherIcon(responseData);

  hideErrorMsg();
}

export default displayData;
export { displayErrorMsg, displayTemps, displayWinds };
