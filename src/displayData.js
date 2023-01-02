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
  const formattedDate = format(dates.current, "EEEE, MMM do y");
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
  }°${option.toUpperCase()}`

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

function displayErrorMsg() {
    const errorMsg = document.querySelector(".error-msg");
    const input = document.querySelector("input");
  
    errorMsg.innerText =
      "Query must be in the form of... \n <City>, \n <City, State>, \n or <City, Country>";
      input.value = "";
  }
  
  function hideErrorMsg() {
    const errorMsg = document.querySelector(".error-msg");
    const input = document.querySelector("input");
  
    errorMsg.innerText = "";
    input.value = "";
  }

function displayData(responseData) {
  displayLocation(responseData.location);
  displayWeatherdesc(responseData.desc);
  displayDate(responseData.dates);
  displayTimes(responseData.dates);
  displayTemps(responseData.temps, "f");
  displayHumidity(responseData.humidity);
  displayWinds(responseData.wind, "mph");

  hideErrorMsg();
}

export default displayData;
export { displayErrorMsg };
