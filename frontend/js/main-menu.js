import { SubmitNewGame, ceoId, gameId} from "./api.js";

window.addEventListener("load", function () {
    if ((gameId != null && gameId != -1) && (ceoId != null && ceoId != -1)) {
        console.log("localStorage had gameId " + gameId + " and ceoId " + ceoId+ " so the game screen was activated automatically")
        window.location.replace("game.html");
    }
    document.getElementById('new-game-button').addEventListener("click", () => CreateCompanyMenu());
    document.getElementById('settings-button').addEventListener("click", () => CreateSettingsMenu());
    document.getElementById('back-button').addEventListener("click", () => CloseCreateCompanyMenu());
    document.getElementById('settings-done-button').addEventListener("click", () => CloseSettingsMenu());
    document.getElementById('done-button').addEventListener("click", () => SubmitNewGame());
});

function CloseCreateCompanyMenu() {
    document.getElementById("create-company").style.display = "none"
}
function CreateCompanyMenu() {
    document.getElementById("create-company").style.display = "block"
}
function CreateSettingsMenu() {
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("settings").style.display = "block"
    document.getElementById("main-menu-title").style.display = "none"
}
function CloseSettingsMenu() {
    document.getElementById("main-menu").style.display = "grid"
    document.getElementById("settings").style.display = "none"
    document.getElementById("main-menu-title").style.display = "grid"
}