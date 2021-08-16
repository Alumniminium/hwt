function SubmitNewGame() {
  id = 0 //id given from server

<<<<<<< HEAD
    company_name = document.getElementById("text-input").children[0].value
    founder_name = document.getElementById("text-input").children[1].value
    difficulty = 0
    difficulty_radios = document.getElementById("difficulties")
    for (let index = 0; index < difficulty_radios.childElementCount; index++) {
        if(difficulty_radios.children[index].checked)
            difficulty = index
    }
    console.log(company_name, founder_name, difficulty)
    let company = new FormData()
    company.append("companyname", company_name)
    company.append("foundername", founder_name)
    company.append("difficulty", difficulty)
    JSON.stringify(Object.fromEntries(company))
    console.log()
    fetch("http://localhost/api/login", {
      headers: {
        'Content-Type': 'application/json'
      },
        mode: "no-cors",
        method: 'POST',
        body: company
    })
    .then(res => res.json())
  .then(data => {
    id = data
=======
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
>>>>>>> 51555a212700ad7e40236b6dc5114472492205c6
  })
    .then(res => res.json())
    .then(data => {
      id = data
    })
}