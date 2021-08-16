function SubmitNewGame() {
  id = 0 //id given from server

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
  })
    .then(res => res.json())
    .then(data => {
      id = data
    })
}