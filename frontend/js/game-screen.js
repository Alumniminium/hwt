let contextMenu = null

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
function ClearLocalStorage()
{
    localStorage.removeItem("id")
    clearTimeout(timer)
    contextMenu.classList.remove("visible")
    window.location.reload()
}
function incrementSeconds() {
     update()
}

var timer = setInterval(incrementSeconds, 1000);