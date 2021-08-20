window.addEventListener("load", function () {
    console.log("Context Menu setup starting...")
    var gamecontainer = document.getElementById("game-container")
    gamecontainer.addEventListener("contextmenu", (event) => showContextMenu(event))
    gamecontainer.addEventListener("click", (event) => showContextMenu(event))
    console.log("Context Menu setup finished!")
})
function showContextMenu(event) {
    event.preventDefault()
    if (event.target.id != "game-container")
        return;
    if (contextMenu.style.display != "block") {
        contextMenu.style.display = "block"
        contextMenu.style.top = "" + event.clientY + "px"
        contextMenu.style.left = "" + event.clientX + "px"
    }
    else
        contextMenu.style.display = "none"
}