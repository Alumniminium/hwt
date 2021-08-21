let contextMenu = null
let timer = null

//progress bar stuff
var circle = null
var radius = null
var circumference = null;

// circle.style.strokeDasharray = `${circumference} ${circumference}`;
// circle.style.strokeDashoffset = `${circumference}`;


window.addEventListener("load", function () {
    console.log("game-screen.js loading...")
    circle = document.querySelector('circle');
    radius = circle.r.baseVal.value;
    circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    contextMenu = document.getElementById("context-menu");
    document.onkeydown = function (evt) {
        if (evt.key === "Escape" || evt.key === "Esc")
            CloseAllModals();
    };
    if (id == null || id == -1) {
        console.log("no id in localstorage, going to index.html")
        window.location.replace('index.html')
    }
    else {
        console.log("gameId = " + id + ", starting update timer...")
        timer = setInterval(ApiUpdate, 1000);
    }
})

function OpenModal(modalname) {
    gamecontainer = document.getElementById("game-container")
    modal = document.getElementById(modalname)
    modal.style.display = "block"
    modal.style.top = "" + gamecontainer.style.left + gamecontainer.offsetHeight / 3 + "px"
    modal.style.left = "" + gamecontainer.style.top + gamecontainer.offsetWidth / 2 - modal.offsetWidth / 2 + "px"
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
function CloseAllModals() {
    [...document.getElementsByClassName("modal")].forEach(element => element.style.display = "none");
}
function ClearLocalStorage() {
    localStorage.clear()
    clearTimeout(timer)
    window.location.replace("index.html");
}
function setProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  }
