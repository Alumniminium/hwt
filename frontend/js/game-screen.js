let contextMenu = null
let timer = null

window.addEventListener("load", function () {
    console.log("game-screen.js loading...")
    contextMenu = document.getElementById("context-menu");

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

function DevelopProductModal() {
    document.getElementById("develop-product").style.display = "block"
    contextMenu.style.display = "none"
}
function ResearchScreenModal() {
    document.getElementById("research").style.display = "block"
    Researches()
    contextMenu.style.display = "none"}
function MarketAnalysisModal() {
    document.getElementById("market-analysis").style.display = "block"
    contextMenu.style.display = "none"
}
function AdvertisingModal() {
    document.getElementById("advertising-campaign").style.display = "block"
    contextMenu.style.display = "none"
}
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
