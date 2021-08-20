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

function OpenModal(modalname) 
{
    gamecontainer = document.getElementById("game-container")
    modal = document.getElementById(modalname)
    modal.style.display = "block"
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
function CloseAllModals() {
    document.getElementById("advertising-campaign").style.display = "none"
    document.getElementById("market-analysis").style.display = "none"
    document.getElementById("research").style.display = "none"
    document.getElementById("develop-product").style.display = "none"
}
function ClearLocalStorage() {
    localStorage.removeItem("id");
    localStorage.removeItem("ceoName");
    localStorage.removeItem("companyName");
    clearTimeout(timer)
    window.location.replace("index.html");
}
