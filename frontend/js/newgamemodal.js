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
    document.getElementById("main-menu").style.display= "grid"
    document.getElementById("create-company").style.display = "none"

}
function CreateCompanyMenu() {
    localStorage.setItem("id", -1)
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("create-company").style.display = "block"
}
function CreateSettingsMenu() {
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("settings").style.display = "block"
} 
function CloseSettingsMenu() {
    document.getElementById("main-menu").style.display = "grid"
    document.getElementById("settings").style.display = "none"
}