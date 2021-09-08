import { Research, ResearchProject } from "./research.js";
import { Modal } from "./modal.js";
import { ContextMenu } from "./context-menu.js";
import { API } from "./api.js";
import * as util from "./utility.js";

const api = new API();
const contextMenu = new ContextMenu();
const modals = new Modal();
const research = new Research();

let timer = null;
let gamespeedtimer = null;

async function Update() {
    var json = await api.Update();
    if (api.millisecondsPerDay != api.millisecondsperday) {
        api.millisecondsperday = json.millisecondsPerDay;
    }
    var date = new Date(json.date);
    api.currentDate = date;
    document.getElementById("date").innerHTML = api.currentDate.toLocaleDateString("en-US");
    document.getElementById("money").innerHTML = "$ " + new Intl.NumberFormat('en-US').format(json.money);
    api.CheckMarket(json.marketProducts, api.currentDate);
}

function ChangeGameSpeed(speed) {
    [...document.getElementsByClassName("gamespeedbutton")].forEach(element => element.style.backgroundColor = "")
    speed.style.backgroundColor = "crimson"
    speed = parseInt(speed.id[0])
    ChangeGameClock()
    api.UpdateRemote(speed)
}

function ChangeGameClock() {
    if (api.millisecondsperday != 0) {
        clearInterval(gamespeedtimer)
        gamespeedtimer = setInterval(AddDay, api.millisecondsperday)
    }
    else
        clearInterval(gamespeedtimer)
}
function AddDay() {
    var date = new Date(document.getElementById("date").innerHTML)
    date.setDate(date.getDate() + 1)
    document.getElementById("date").innerHTML = date.toLocaleDateString("en-US")
}

window.addEventListener("load", function () {

    console.log("game-screen.js loading...")
    if (util.checkId()) {
        timer = setInterval(Update, 1000)
        document.getElementById("0x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("0x")));
        document.getElementById("1x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("1x")));
        document.getElementById("2x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("2x")));
        document.getElementById("6x").addEventListener("click", () => ChangeGameSpeed(document.getElementById("6x")));

        modals.setupModals();
        research.setupProgressRing()
        contextMenu.setupContextMenu();
    }
    else
        window.location.replace('index.html')
})