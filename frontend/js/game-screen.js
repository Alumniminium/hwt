let contextMenu = null
let timer = null

window.addEventListener("load", function () {
    contextMenu = document.getElementById("context-menu");
})
function DevelopProductModal()
{
    document.getElementById("develop-product").style.display = "block"
    contextMenu.classList.remove("visible")
}
function ResearchScreenModal() 
{
    document.getElementById("research").style.display = "block"
    Researches()
    contextMenu.classList.remove("visible")
}
function MarketAnalysisModal() 
{
    document.getElementById("market-analysis").style.display = "block"
    contextMenu.classList.remove("visible")
}
function AdvertisingModal() 
{
    document.getElementById("advertising-campaign").style.display = "block"
    contextMenu.classList.remove("visible")
}
function CloseAllModals()
{
    document.getElementById("advertising-campaign").style.display = "none"
    document.getElementById("market-analysis").style.display = "none"
    document.getElementById("research").style.display = "none"
    document.getElementById("develop-product").style.display = "none"

}
function ClearLocalStorage()
{
    localStorage.removeItem("id")
    clearTimeout(timer)
    contextMenu.classList.remove("visible")
    window.location.reload()
    console.log(timer)
    clearInterval(timer)
    window.location.replace("index.html");
}
function startUpdateTimer()
{
    timer = setInterval(callApiUpdate, 1000);
}
function callApiUpdate() {
    update()
}
