function NewGame()
{
    CreateCompany()
}
function CloseCreateCompanyMenu()
{
    console.log("closemodai")
    document.getElementById("create-company").style.display = "none"
}
function CreateCompany()
{
    console.log("openmodai")
    document.getElementById("create-company").style.display = "inline"

}