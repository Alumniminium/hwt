import * as api from "./api.js";
import * as contexMenu from "./context-menu.js";
import * as modals from "./modal.js";
import * as research from "./research.js";
// import * as mainmenu from "./main-menu.js";

let timer = null
let gamespeedtimer = null
var currentDate = null

window.addEventListener("load", function () {

    console.log("game-screen.js loading...")
    if (checkId()) {

        document.getElementById("0x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("0x")));
        document.getElementById("1x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("1x")));
        document.getElementById("2x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("2x")));
        document.getElementById("6x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("6x")));

        modals.setupModals();
        research.setupProgressRing()
        contexMenu.setupContextMenu();
    }
})

function checkId() {
    if ((api.gameId == null || api.gameId == -1) && (api.ceoId == null || api.ceoId == -1)) {
        console.log("no id in localstorage, going to index.html")
        window.location.replace('index.html')
        return false;
    }
    else {
        console.log("gameId = " + api.gameId + ", starting update timer...")
        timer = setInterval(api.Update, 1000)
        return true;
    }
}

export function ChangeGameSpeed(speed){
    [...document.getElementsByClassName("gamespeedbutton")].forEach(element => element.style.backgroundColor = "")
    speed.style.backgroundColor = "crimson"
    speed = parseInt(speed.id[0])
    ChangeGameClock()
    api.UpdateRemote(speed)
}

export function ChangeGameClock() {
    if(api.millisecondsperday!=0)
    {
        clearInterval(gamespeedtimer)
        gamespeedtimer = setInterval(AddDay, api.millisecondsperday)
    }
    else
        clearInterval(gamespeedtimer)        
}

function AddDay(){
    var date = new Date(document.getElementById("date").innerHTML)
    date.setDate(date.getDate() + 1)
    document.getElementById("date").innerHTML = date.toLocaleDateString("en-US")
}

export function ClearLocalStorage() {
    localStorage.clear()
    clearTimeout(timer)
    window.location.replace("index.html")
}