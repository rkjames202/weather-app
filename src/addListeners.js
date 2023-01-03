import createQueryCall, { processedData } from "./fetchData";
import displayData, {
  displayErrorMsg,
  displayTemps,
  displayWinds,
} from "./displayData";

function getUserQuery() {
  const query = document.querySelector("input").value.trim();

  return query;
}

function submitQuery(e) {
  e.preventDefault();

  const query = getUserQuery();

  if (query) {
    createQueryCall(query).then(displayData).catch(displayErrorMsg);
  }
}

function toggleUnits(e) {
  if (e.target.innerText.includes("Metric")) {
    displayTemps(processedData.temps, "c");
    displayWinds(processedData.wind, "km");
    e.target.innerText = "Display Imperial Units";
  } else if (e.target.innerText.includes("Imperial")) {
    displayTemps(processedData.temps, "f");
    displayWinds(processedData.wind, "mph");
    e.target.innerText = "Display Metric Units";
  } else {
    displayTemps(processedData.temps, "f");
    displayWinds(processedData.wind, "mph");
    e.target.innerText = "Display Metric Units";
  }
}

function addFormListener() {
  const form = document.querySelector("form");

  form.addEventListener("submit", submitQuery);
}

function addToggleUnitListener() {
  const toggleButton = document.querySelector(".toggle-units");

  toggleButton.addEventListener("click", toggleUnits);
}

function addListeners() {
  addFormListener();
  addToggleUnitListener();
}

export default addListeners;
