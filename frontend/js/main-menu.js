import { API } from "./api.js";
import * as util from "./utility.js";

let api = new API();

window.addEventListener("load", function () {
    if (util.checkId()) {
        console.log("localStorage had gameId " + api.gameId + " and ceoId " + api.ceoId + " so the game screen was activated automatically")
        window.location.replace("game.html");
    }
    document.getElementById('new-game-button').addEventListener("click", () => CreateCompanyMenu());
    document.getElementById('settings-button').addEventListener("click", () => CreateSettingsMenu());
    document.getElementById('back-button').addEventListener("click", () => CloseCreateCompanyMenu());
    document.getElementById('settings-done-button').addEventListener("click", () => CloseSettingsMenu());
    document.getElementById('done-button').addEventListener("click", () => StartGame());
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

async function StartGame() {
    var companyName = document.getElementById("text-input").children[0].value;
    var ceoName = document.getElementById("text-input").children[1].value;
    var difficulty = 0;

    var difficulty_radios = document.getElementById("difficulties");
    for (let index = 0; index < difficulty_radios.childElementCount; index++) {
        if (difficulty_radios.children[index].checked) {
            difficulty = index;
            break;
        }
    }

    var data = await api.SubmitNewGame(companyName, ceoName, difficulty);
    var gameId = data.gameId;
    var ceoId = data.ceoId;
    if (gameId != -1) {
        localStorage.setItem("gameId", gameId);
        localStorage.setItem("ceoId", ceoId);
        localStorage.setItem("ceoName", ceoName);
        localStorage.setItem("companyName", companyName);
        window.location.replace("game.html");
    }
}