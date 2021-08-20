let id = 0 //id given from server
function SubmitNewGame() {

  company_name = document.getElementById("text-input").children[0].value
  founder_name = document.getElementById("text-input").children[1].value
  difficulty = 0
  difficulty_radios = document.getElementById("difficulties")
  for (let index = 0; index < difficulty_radios.childElementCount; index++) {
    if (difficulty_radios.children[index].checked)
    {
      difficulty = index
      break;
    }
  }
  console.log(company_name, founder_name, difficulty)
  let company = new FormData()
  company.append("ceoName", founder_name)
  company.append("companyName", company_name)
  company.append("difficulty", difficulty)
  fetch("http://localhost/api/login", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(company))
  })
    .then(res => res.json())
    .then(data => {
      id = data.id
      if(id != -1)
      {
        localStorage.setItem("id",id)
        localStorage.setItem("ceoName",founder_name)
        localStorage.setItem("companyName",company_name)
        window.location.replace("game.html");
      }
    })
}