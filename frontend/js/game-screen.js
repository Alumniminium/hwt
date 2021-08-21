let contextMenu = null
let timer = null
let progressicontimer = null

//progress bar stuff
var circle = null
var radius = null
var circumference = null;

window.addEventListener("load", function () {
    console.log("game-screen.js loading...")
    circle = document.querySelector('circle');
    radius = circle.r.baseVal.value;
    circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    contextMenu = document.getElementById("context-menu");
    document.getElementById("research-progress").innerHTML = ""
    document.getElementById("product-progress").innerHTML = ""

    
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
function SetProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
  }
function UpdateProgress(){

    dayspassed = localStorage.getItem('research_days_passed')
    research_days = parseInt(localStorage.getItem('research_days'))
    dayspassed = parseFloat(dayspassed.replace(",", "."));
    dayspassed = dayspassed + 0.033;
    localStorage.setItem('research_days_passed', ""+dayspassed)
    progress = (dayspassed/research_days) * 100
    if(progress <=100)
    {
        document.getElementById("research-progress").innerHTML = localStorage.getItem("research_name")
        SetProgress(""+progress)
    }
    else{
        SetProgress("0")
        document.getElementById("research-progress").innerHTML = ""
        localStorage.setItem('research_name', null)
        clearTimeout(progressicontimer)
        PopMessage(localStorage.getItem("research_name") + " finished!")
    }
}
function PopMessage(message,x,y){
    if(document.getElementsByClassName("pop-message").length > 5){
        document.getElementsByClassName("pop-message")[0].remove()
    }
    messageElement = document.createElement("div");
    messageElement.classList.add("pop-message");
    messageElement.innerHTML = message
    messageElement.style.top = "" + x + "px";
    messageElement.style.left = ""+y+"px";
    document.body.appendChild(messageElement)
}