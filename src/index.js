import createQueryCall from "./fetchData";
import displayData from "./displayData";
import addListeners from "./addListeners";

/**
 * Commit
 * Complete layout / style
 * Commit
 * Add Icons
 */

function main(){
 createQueryCall("Baltimore").then(displayData);
 addListeners();
}

main();

