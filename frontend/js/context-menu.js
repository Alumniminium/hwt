window.addEventListener("load", function ()
{
    console.log("Context Menu setup starting...")
    const contextMenu = document.getElementById("context-menu");
    document.getElementById("game-container").addEventListener("contextmenu",(event) =>{
        if(event.target.id == "game-container")
        {
            if(contextMenu.style.display != "block")
            {
                if(isAnyModalOpen())
                 CloseAllModals()
                 else{
                     contextMenu.style.display = "block"
                     contextMenu.style.top = "" + event.clientY + "px"
                     contextMenu.style.left = "" + event.clientX + "px"
                     console.log(contextMenu.style.left,contextMenu.style.top)
                 }
            }
            else
                contextMenu.style.display = "none"
        }
    })
    document.getElementById("game-container").addEventListener("click",(event) =>{
        if(event.target.id == "game-container")
        {
            if(contextMenu.style.display != "block")
            {
                if(isAnyModalOpen())
                 CloseAllModals()
                 else{
                     contextMenu.style.display = "block"
                     contextMenu.style.top = "" + event.clientY + "px"
                     contextMenu.style.left = "" + event.clientX + "px"
                     console.log(contextMenu.style.left,contextMenu.style.top)
                 }
            }
            else
                contextMenu.style.display = "none"
        }
    })
    console.log("Context Menu setup finished!")
})
function isAnyModalOpen()
{
    open = false
    var modals = document.getElementsByClassName("modal");

    Array.prototype.forEach.call(modals, function(modal) {
        if(modal.style.display != "none" && modal.style.display != "")
            open = true
    });

    return open
}