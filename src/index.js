import createQueryCall from "./fetchData";
import displayData from "./displayData";
import addListeners from "./addListeners";
import tabIcon from "./sun.png"

/**
 * Add tab icon
 */
function addTabIcon(){
    const link = document.createElement("link");
    const head = document.querySelector("head");

    link.rel = "icon";
    link.href = tabIcon;

    head.appendChild(link);
}

/**
 * Call necessary functions along with default query
 */
function main() {
  addTabIcon();
  createQueryCall("Cambridge").then(displayData);
  addListeners();
}

main();
