function CloseCreateCompanyMenu()
{
    document.getElementById("main-menu").style.display= "block"
    document.getElementById("create-company").style.display = "none"

}
function CreateCompanyMenu()
{
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("create-company").style.display = "block"
}
function OpenGameScreen()
{
    gamescreen = document.getElementById("game-container")
    gamescreen.style.background = "#4a4745 url(/css/game-screen.png) no-repeat center center";
    gamescreen.style.animation = "none"
    document.getElementById("game-ribbon").style.display = "flex"
}