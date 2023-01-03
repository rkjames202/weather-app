import createQueryCall from "./fetchData";
import displayData from "./displayData";
import addListeners from "./addListeners";

function main() {
  createQueryCall("Cambridge").then(displayData);
  addListeners();
}

main();
