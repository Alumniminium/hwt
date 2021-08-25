window.addEventListener("load", function () {
    var id = localStorage.getItem("id");
    if (id != null && id != -1) {
        console.log("localStorage had Id " + id + " so the game screen was activated automatically")
        window.location.replace("game.html");
    }
});

function CloseCreateCompanyMenu() {
    document.getElementById("create-company").style.display = "none"
}
function CreateCompanyMenu() {
    localStorage.setItem("id", -1)
    document.getElementById("create-company").style.display = "block"
}
function CreateSettingsMenu() {
    document.getElementById("main-menu").style.display = "none"
    document.getElementById("settings").style.display = "block"
    document.getElementById("main-menu-title").style.display = "none"
}
function CloseSettingsMenu() {
    document.getElementById("main-menu").style.display = "grid"
    document.getElementById("settings").style.display = "none"
    document.getElementById("main-menu-title").style.display = "grid"
}