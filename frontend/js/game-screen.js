let contextMenu = null
let timer = null
let progressicontimer = null
let gamespeedtimer = null
let millisecondsperday = null
//progress bar stuff
var circle = null
var radius = null
var circumference = null;

var pickedmodal = null
var x0,y0
window.addEventListener("load", function () {

    [...document.getElementsByClassName("modal")].forEach(e => {
        dragElement(e);
    });
    console.log("game-screen.js loading...")
    if (checkId()) {
        if(localStorage.hasOwnProperty("gamespeed"))
        {
            ChangeGameSpeed(document.getElementById("" + millisecondsperday/1000 + "x"))
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
    // CloseAllModals()
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
    dayspassed = dayspassed + millisecondsperday/30000;
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
    ApiUpdate_Post(speed)
}
function ChangeGameClock(){
    if(millisecondsperday!=0)
    {
        clearInterval(gamespeedtimer)
        //alert(millisecondsperday)
        gamespeedtimer = setInterval(AddDay, millisecondsperday)
        if(localStorage.hasOwnProperty("researchname"))
            progressicontimer = setInterval(UpdateProgress())
    }
    else{
        clearInterval(gamespeedtimer)
        if(localStorage.hasOwnProperty("researchname"))
            clearInterval(progressicontimer)
        
    }
}
function AddDay(){
    date = new Date(document.getElementById("date").innerHTML)
    date.setDate(date.getDate() + 1)
    document.getElementById("date").innerHTML = date.toLocaleDateString("en-US")
}


function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
