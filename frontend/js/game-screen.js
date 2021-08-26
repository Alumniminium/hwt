let contextMenu = null
let timer = null
let progressicontimer = null

//progress bar stuff
var circle = null
var radius = null
var circumference = null;

window.addEventListener("load", function () {
    console.log("game-screen.js loading...")
    if (checkId()) {
        setupProgressRing()
        contextMenu = document.getElementById("context-menu");

        document.onkeydown = function (evt) {
            if (evt.key === "Escape" || evt.key === "Esc")
                CloseAllModals();
        };
    }
})

function checkId() {
    if ((gameId == null || gameId == -1) && (ceoId == null || ceoId == -1)) {
        console.log("no id in localstorage, going to index.html")
        window.location.replace('index.html')
        return false;
    }
    else {
        console.log("gameId = " + gameId + ", starting update timer...")
        timer = setInterval(ApiUpdate, 1000)
        return true;
    }
}

function setupProgressRing() {
    circle = document.querySelector('circle')
    radius = circle.r.baseVal.value
    circumference = radius * 2 * Math.PI
    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = `${circumference}`
}

function OpenModal(modalname) {
    CloseAllModals()
    modal = document.getElementById(modalname)
    modal.style.display = "flow-root"
    switch (modalname) {
        case "research":
            Researches()
            break;
        case "develop-product":

            break;
        case "market-analysis":

            break;
        case "advertising-campaign":

            break;
        default:
            break;
    }
    contextMenu.style.display = "none"
}
function SetProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}
function UpdateProgress() {

    dayspassed = localStorage.getItem('research_days_passed')
    research_days = parseInt(localStorage.getItem('research_days'))
    dayspassed = parseFloat(dayspassed.replace(",", "."));
    dayspassed = dayspassed + 0.033;
    localStorage.setItem('research_days_passed', "" + dayspassed)
    progress = (dayspassed / research_days) * 100
    if (progress <= 100) {
        document.getElementById("research-progress").innerHTML = localStorage.getItem("research_name")
        SetProgress("" + progress)
    }
    else {
        SetProgress("0")
        document.getElementById("research-progress").innerHTML = ""
        localStorage.setItem('research_name', null)
        clearTimeout(progressicontimer)
        PopMessage(localStorage.getItem("research_name") + " finished!")
    }
}
function PopMessage(message, x, y) {
    if (document.getElementsByClassName("pop-message").length > 5) {
        document.getElementsByClassName("pop-message")[0].remove()
    }
    messageElement = document.createElement("div");
    messageElement.classList.add("pop-message");
    messageElement.innerHTML = message
    messageElement.style.top = "" + x + "px";
    messageElement.style.left = "" + y + "px";
    document.body.appendChild(messageElement)
}


function CloseAllModals() {
    [...document.getElementsByClassName("modal")].forEach(element => element.style.display = "none");
}
function ClearLocalStorage() {
    localStorage.clear()
    clearTimeout(timer)
    window.location.replace("index.html");
}