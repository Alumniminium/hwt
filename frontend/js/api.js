import { CloseModal } from "./modal.js";
import { ResearchProject, UpdateProgress } from "./research.js";
import { OpenNewspaper } from "./newspaper.js";
import { ShowMessage } from "./modal.js";

export let gameId = localStorage.getItem("gameId");
export let ceoId = localStorage.getItem("ceoId");
export let companyName = "";
export let founderName = "";
export let difficulty = 0;
export let researchProject = new ResearchProject();
export let currentDate = null;
export let millisecondsperday = 0;
export var progressicontimer = null

let loginUrl = "http://localhost/api/login";
let updateUrl = "http://localhost/api/update/";
let GETresearchUrl = "http://localhost/api/research/?gameId=" + gameId + "&ceoId=" + ceoId;
let PUTresearchUrl = "http://localhost/api/research/";

let marketNames = [];

export function SubmitNewGame() {

  companyName = document.getElementById("text-input").children[0].value;
  founderName = document.getElementById("text-input").children[1].value;
  difficulty = 0;
  var difficulty_radios = document.getElementById("difficulties");
  for (let index = 0; index < difficulty_radios.childElementCount; index++) {
    if (difficulty_radios.children[index].checked) {
      difficulty = index;
      break;
    }
  }
  console.log(companyName, founderName, difficulty)
  let company = new FormData();
  company.append("ceoName", founderName);
  company.append("companyName", companyName);
  company.append("difficulty", difficulty);
  fetch(loginUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(company))
  })
    .then(res => res.json())
    .then(data => {
      gameId = data.gameId;
      ceoId = data.ceoId;
      if (gameId != -1) {
        localStorage.setItem("gameId", gameId);
        localStorage.setItem("ceoId", ceoId);
        localStorage.setItem("ceoName", founderName);
        localStorage.setItem("companyName", companyName);
        window.location.replace("game.html");
      }
    })
}


export function UpdateRemote(gamespeed) {
  var update = new FormData();
  update.append("gameId", gameId);
  update.append("ceoId", ceoId);
  update.append("gameSpeed", gamespeed);
  fetch(updateUrl, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(update))
  }).then(Update())
}
export function Update() {
  fetch(updateUrl)
    .then(res => {
      if (res.status == 200)
        return res.json()
      else
        ClearLocalStorage()
    })
    .then(json => {
      if (json.millisecondsPerDay != millisecondsperday) {
        millisecondsperday = json.millisecondsPerDay;
      }
      var date = new Date(json.date);
      currentDate = date;
      document.getElementById("date").innerHTML = currentDate.toLocaleDateString("en-US");
      document.getElementById("money").innerHTML = "$ " + new Intl.NumberFormat('en-US').format(json.money);
      CheckMarket(json.marketProducts, currentDate);
    })
}

export function Researches() {
  var researchableList = document.getElementById("researchable-table");
  var researchedList = document.getElementById("researched");
  removeElementsByClass("researched-modal-item");
  removeElementsByClass("researchable-modal-item");

  fetch(GETresearchUrl)
    .then(res => res.json())
    .then(data => {
      data.forEach(research => {
        var div = document.createElement('div');
        div.textContent = research.name;
        div.className = "researched-modal-item";

        if (research.price != 0) {
          var tr = document.createElement('tr');

          var tdIcon = document.createElement('td');
          var icon = document.createElement("img");
          icon.src = "images/raid-shadow-legends.jpeg";
          tdIcon.appendChild(icon);

          var tdName = document.createElement('td');
          tdName.appendChild(document.createTextNode(research.name));

          var tdPrice = document.createElement('td');
          tdPrice.appendChild(document.createTextNode(research.price));

          var tdResearchPoints = document.createElement('td');
          tdResearchPoints.appendChild(document.createTextNode(research.price / 10));

          var tdDescription = document.createElement('td');
          tdDescription.appendChild(document.createTextNode(research.description));

          tr.className = "researchable-modal-item"
          tr.appendChild(tdIcon);
          tr.appendChild(tdName);
          tr.appendChild(tdPrice);
          tr.appendChild(tdResearchPoints);
          tr.appendChild(tdDescription);
          tr.addEventListener("click", () => StartResearch(research.name))
          researchableList.appendChild(tr);
        }
        else
          researchedList.appendChild(div);

      });
    });
}

export function StartResearch(researchName) {

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
        researchProject = new ResearchProject(researchName,currentDate,addDays(currentDate, data.secondsUntilDone))
        ShowMessage("Starting " + researchName, 270, 300, "pop-message")
        progressicontimer = setInterval(UpdateProgress, 33)
      }
      else
        alert(data.debugInfo)
    });

  CloseModal('research')
}

export function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0)
    elements[0].parentNode.removeChild(elements[0]);
}

export function CheckMarket(market, date) {
  market.forEach(p => {
    if (marketNames.includes(p.name))
      return

    marketNames.push(p.name)
    OpenNewspaper(p.name, p.company, p.price, p.description, date)
  });
}