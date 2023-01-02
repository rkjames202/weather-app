import createQueryCall from "./fetchData";
import displayData, { displayErrorMsg } from "./displayData";

function getUserQuery() {
  const query = document.querySelector("input").value.trim();

  return query;
}

function submitQuery(e){
    e.preventDefault();

    const query = getUserQuery();

    if (query) {
      createQueryCall(query).then(displayData).catch(displayErrorMsg);
    }
}

function addFormListener() {
  const form = document.querySelector("form");

  form.addEventListener("submit", submitQuery);
}

function addListeners() {
  addFormListener();
}

export default addListeners;
