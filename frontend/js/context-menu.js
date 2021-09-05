import * as modals from "./modal.js";
import * as game from "./game-screen.js";

let contextMenu = document.getElementById("context-menu");

export function setupContextMenu() {
    console.log("Context Menu setup starting...")
    var gamecontainer = document.getElementById("game-container")
    gamecontainer.addEventListener("contextmenu", (event) => showContextMenu(event))
    gamecontainer.addEventListener("click", (event) => showContextMenu(event))

    var develop = document.getElementById("develop-product-contextmenu-item");
    develop.addEventListener("click", () => modals.OpenModal('develop-product'));
    var researc = document.getElementById("research-contextmenu-item");
    researc.addEventListener("click", () =>  modals.OpenModal('research'));
    var market = document.getElementById("market-analysis-contextmenu-item");
    market.addEventListener("click", () => modals.OpenModal('market-analysis'));
    var ad = document.getElementById("advertising-campaign-contextmenu-item");
    ad.addEventListener("click", () => modals.OpenModal('advertising-campaign'));
    var debg = document.getElementById("debug-clearlocalstorage-contextmenu-item");
    debg.addEventListener("click", () => game.ClearLocalStorage());
    console.log("Context Menu setup finished!")
}

function showContextMenu(event) {
    event.preventDefault()
    if (event.target.id != "game-container")
        return;
    if (contextMenu.style.display != "block") {
        contextMenu.style.display = "block"
        contextMenu.style.top = "" + event.clientY + "px"
        contextMenu.style.left = "" + event.clientX + "px"
    }
    else
        contextMenu.style.display = "none"
}