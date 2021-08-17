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
    contextMenu.classList.remove("visible")
    window.location.reload()
}