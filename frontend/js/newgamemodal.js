window.addEventListener("load", setupGame)
function setupGame() {
    var id = localStorage.getItem("id");
    if(id != null && id != -1)
    {
        console.log("localStorage had Id "+id+" so the game screen was activated automatically")
        OpenGameScreen()
    }
}

function CloseCreateCompanyMenu()
{
    document.getElementById("main-menu").style.display= "block"
    document.getElementById("create-company").style.display = "none"

}
function CreateCompanyMenu()
{
    localStorage.setItem("id",-1)
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("create-company").style.display = "block"
}
function OpenGameScreen()
{
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("create-company").style.display = "none"
    gamescreen = document.getElementById("game-container")
    gamescreen.style.background = "#4a4745 url(/images/game-screen.png) no-repeat center center";
    gamescreen.style.animation = "none"
    document.getElementById("game-ribbon").style.display = "flex"
}