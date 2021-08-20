let contextMenu = null
let timer = null

window.addEventListener("load", function () {
    console.log("game-screen.js loading...")
    contextMenu = document.getElementById("context-menu");
    document.onkeydown = function(evt) {
        evt = evt || window.event;
        var isEscape = false;
        if ("key" in evt) {
            isEscape = (evt.key === "Escape" || evt.key === "Esc");
        } else {
            isEscape = (evt.keyCode === 27);
        }
        if (isEscape) {
            CloseAllModals();
        }
    };
    if (id == null || id == -1) {
        console.log("no id in localstorage, going to index.html")
        window.location.replace('index.html')
    }
    else 
    {       
        console.log("gameId = " + id + ", starting update timer...")
        timer = setInterval(ApiUpdate, 1000);
    }
})
window.addEventListener("keypress")
function OpenModal(modalname){
    modal = document.getElementById(modalname)
    modal.style.display = "block"
    gamecontainer = document.getElementById("game-container")
    modal.style.top ="" + gamecontainer.style.left + gamecontainer.offsetHeight / 3 +"px"
    modal.style.left ="" + gamecontainer.style.top + gamecontainer.offsetWidth / 2 - modal.offsetWidth / 2 +"px"
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
// function DevelopProductModal() {
//     document.getElementById("develop-product").style.display = "block"
//     contextMenu.style.display = "none"
// }
// function ResearchScreenModal() {
//     modal = document.getElementById("research")
//     modal.style.display = "block"
//     modal.style.top ="" + document.body.offsetWidth / 2 +"px"
//     modal.style.left ="" + document.body.offsetHeight / 2 +"px"
//     Researches()
//     contextMenu.style.display = "none"}
// function MarketAnalysisModal() {
//     modal = document.getElementById("market-analysis")
//     modal.style.display = "block"
//     modal.style.top = document.getElementById("game-container").style.top / 2
//     modal.style.top = document.getElementById("game-container").style.left / 2
//     contextMenu.style.display = "none"
// }
// function AdvertisingModal() {
//     document.getElementById("advertising-campaign").style.display = "block"
//     contextMenu.style.display = "none"
// }
function CloseAllModals() {
    document.getElementById("advertising-campaign").style.display = "none"
    document.getElementById("market-analysis").style.display = "none"
    document.getElementById("research").style.display = "none"
    document.getElementById("develop-product").style.display = "none"
}
function ClearLocalStorage() {
    localStorage.removeItem("id")
    clearTimeout(timer)
    contextMenu.classList.remove("visible")
    window.location.reload()
    console.log(timer)
    clearInterval(timer)
    window.location.replace("index.html");
}
