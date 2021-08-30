let gameId = localStorage.getItem("gameId")
let ceoId = localStorage.getItem("ceoId")

let loginUrl = "http://localhost/api/login"
let updateUrl = "http://localhost/api/update/"
let GETresearchUrl = "http://localhost/api/research/?gameId=" + gameId + "&ceoId=" + ceoId
let PUTresearchUrl = "http://localhost/api/research/"

let marketNames = [];

function SubmitNewGame() {

  company_name = document.getElementById("text-input").children[0].value
  founder_name = document.getElementById("text-input").children[1].value
  difficulty = 0
  difficulty_radios = document.getElementById("difficulties")
  for (let index = 0; index < difficulty_radios.childElementCount; index++) {
    if (difficulty_radios.children[index].checked) {
      difficulty = index
      break;
    }
  }
  console.log(company_name, founder_name, difficulty)
  let company = new FormData()
  company.append("ceoName", founder_name)
  company.append("companyName", company_name)
  company.append("difficulty", difficulty)
  fetch(loginUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(company))
  })
    .then(res => res.json())
    .then(data => {
      gameId = data.gameId
      ceoId = data.ceoId
      if (gameId != -1) {
        localStorage.setItem("gameId", gameId)
        localStorage.setItem("ceoId", ceoId)
        localStorage.setItem("ceoName", founder_name)
        localStorage.setItem("companyName", company_name)
        window.location.replace("game.html");
      }
    })
}


function ApiUpdate_Post(gamespeed) {
  update = new FormData()
  update.append("gameId", gameId)
  update.append("ceoId", ceoId)
  update.append("gameSpeed", gamespeed)
  fetch("http://localhost/api/update/", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(update))
  })
}
function ApiUpdate() {
  fetch(updateUrl)
    .then(res => {
      if (res.status == 200)
        return res.json()
      else
        ClearLocalStorage()
    })
    .then(json => {
      document.getElementById("date").innerHTML = new Date(json.date).toLocaleDateString("en-US")
      document.getElementById("money").innerHTML = "$ " + new Intl.NumberFormat('en-US').format(json.money)
      CheckMarket(json.marketProducts, json.date)
    });
}

function Researches() {
  researchableList = document.getElementById("researchable-table")
  researchedList = document.getElementById("researched")
  removeElementsByClass("researched-modal-item")
  removeElementsByClass("researchable-modal-item")

  fetch(GETresearchUrl)
    .then(res => res.json())
    .then(data => {
      data.forEach(research => {
        var div = document.createElement('div');
        div.textContent = research.name;
        div.className = "researched-modal-item"

        if (research.price != 0) {
          var tr = document.createElement('tr');
          var tdName = document.createElement('td');
          tdName.appendChild(document.createTextNode(research.name));
          var tdPrice = document.createElement('td');
          tdPrice.appendChild(document.createTextNode(research.price));
          var tdDescription = document.createElement('td');
          tdDescription.appendChild(document.createTextNode(research.description));
          tr.className = "researchable-modal-item"
          tr.appendChild(tdName);
          tr.appendChild(tdPrice);
          tr.appendChild(tdDescription);
          tr.addEventListener("click", function () { StartResearch(research.name) })
          researchableList.appendChild(tr);
        }
        else
          researchedList.appendChild(div);

      });
    });
}

function StartResearch(researchName) {

  let researchRequest = new FormData()
  researchRequest.append("gameId", gameId)
  researchRequest.append("ceoId", ceoId)
  researchRequest.append("researchProject", researchName)

  fetch(PUTresearchUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(Object.fromEntries(researchRequest))
  }).then(res => res.json())
    .then(data => {
      if (data.success) {
        localStorage.setItem("research_days", data.secondsUntilDone)
        localStorage.setItem("research_days_passed", 0)
        localStorage.setItem("research_name", researchName)
        ShowMessage("Starting" + researchName, 270, 300, "pop-message")
        progressicontimer = setInterval(UpdateProgress, 33)
      }
      else
        alert(data.debugInfo)
    });

  CloseAllModals()
}
function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0)
    elements[0].parentNode.removeChild(elements[0]);
}

function CheckMarket(market, date) {
  market.forEach(p => {
    if (marketNames.includes(p.name))
      return

    marketNames.push(p.name)
    OpenNewspaper(p.name, p.company, p.price, p.description, date)
  });
}
