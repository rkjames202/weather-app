import createQueryCall, { processedData } from "./fetchData";
import displayData, {
  displayErrorMsg,
  displayTemps,
  displayWinds,
} from "./displayData";

/**
 * Gets user's query from input
 *
 * @returns - Query the user entered
 */
function getUserQuery() {
  const query = document.querySelector("input").value.trim();
  return query;
}

/**
 * Submits query, makes API call, displays data
 *
 * @param {object} e - event object
 */
function submitQuery(e) {
  // Prevents default behavior of form
  e.preventDefault();

  const query = getUserQuery();

  // If user enters a query
  if (query) {
    createQueryCall(query).then(displayData).catch(displayErrorMsg);
  }
}

/**
 * Toggles temperature units and wind speed unit from
 * imperial to metric
 *
 * @param {*} e - event object
 */
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
    // Default to imperial units
    displayTemps(processedData.temps, "f");
    displayWinds(processedData.wind, "mph");
    e.target.innerText = "Display Metric Units";
  }
}

/**
 * Adds listener to form
 */
function addFormListener() {
  const form = document.querySelector("form");

  form.addEventListener("submit", submitQuery);
}

/**
 * Add listener to toggle units button
 */
function addToggleUnitListener() {
  const toggleButton = document.querySelector(".toggle-units");

  toggleButton.addEventListener("click", toggleUnits);
}

/**
 * Add all event listeners 
 */
function addListeners() {
  addFormListener();
  addToggleUnitListener();
}

export default addListeners;
