let contextMenu = null
let timer = null
let progressicontimer = null
let gamespeedtimer = null

//progress bar stuff
var circle = null
var radius = null
var circumference = null;

window.addEventListener("load", function () {
    console.log("game-screen.js loading...")
    if (checkId()) {
        if(localStorage.hasOwnProperty("gamespeed"))
        {
            ChangeGameSpeed(document.getElementById(localStorage.getItem("gamespeed") + "x"))
        }
        else{
            ChangeGameSpeed(document.getElementById("1x"))
        }
        setupProgressRing()
        contextMenu = document.getElementById("context-menu");

        document.onkeydown = function (evt) {
            if (evt.key === "Escape" || evt.key === "Esc")
                CloseAllModals();
        };
        if(localStorage.getItem("research_name") != null)
        {
            progressicontimer = setInterval(UpdateProgress, 33)
        }
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
        ShowMessage(localStorage.getItem("research_name") + " finished!", 10, 52, "still-message")
        localStorage.setItem('research_name', null)
        clearTimeout(progressicontimer)
    }
}
function ShowMessage(message, x, y, style) {
    if (document.getElementsByClassName(style).length > 5) {
        document.getElementsByClassName(style)[0].remove()
    }
    messageElement = document.createElement("div")
    messageElement.classList.add(style);
    messageElement.innerHTML = message
    messageElement.style.top = "" + y + "px"
    messageElement.style.left = "" + x + "px"
    document.body.appendChild(messageElement)
}


function CloseAllModals() {
    [...document.getElementsByClassName("modal")].forEach(element => element.style.display = "none")
}
function ClearLocalStorage() {
    localStorage.clear()
    clearTimeout(timer)
    window.location.replace("index.html")
}
function ChangeGameSpeed(speed){
    [...document.getElementsByClassName("gamespeedbutton")].forEach(element => element.style.backgroundColor = "")
    speed.style.backgroundColor = "crimson"
    speed = parseInt(speed.id[0])
    localStorage.setItem("gamespeed", speed)
    ApiUpdate_Post(speed)
    if(speed!=0)
    {
        speed = Math.round(1000/speed)
        clearInterval(gamespeedtimer)
        gamespeedtimer = setInterval(AddDay, speed)
    }
    else{
        clearInterval(gamespeedtimer)
    }
}
function AddDay(){
    date = new Date(document.getElementById("date").innerHTML)
    date.setDate(date.getDate() + 1)
    document.getElementById("date").innerHTML = date.toLocaleDateString("en-US")
}