function DevelopProductModal()
{
    const contextMenu = document.getElementById("context-menu");
    document.getElementById("develop-product").style.display = "block"
    contextMenu.classList.remove("visible")
}
function ResearchScreenModal() 
{
    const contextMenu = document.getElementById("context-menu");
    document.getElementById("research").style.display = "block"
    contextMenu.classList.remove("visible")
}
function MarketAnalysisModal() 
{
    const contextMenu = document.getElementById("context-menu");
    document.getElementById("market-analysis").style.display = "block"
    contextMenu.classList.remove("visible")
}
function AdvertisingModal() 
{
    const contextMenu = document.getElementById("context-menu");
    document.getElementById("advertising-campaign").style.display = "block"
    contextMenu.classList.remove("visible")
}
function ClearLocalStorage()
{
    const contextMenu = document.getElementById("context-menu");
    localStorage.removeItem("id")
    contextMenu.classList.remove("visible")
    window.location.reload()
}