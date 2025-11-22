import { Modal } from "./modal.js";
import { ResearchProject, Research } from "./research.js";
import { OpenNewspaper } from "./newspaper.js";
import * as util from "./utility.js";

export class API {
  modal = new Modal();
  researchProject = new ResearchProject();
  currentDate = null;
  millisecondsperday = 0;
  progressicontimer = null;
  marketNames = [];

  async SubmitNewGame(companyName,ceoName,difficulty) {
    let company = new FormData();
    company.append("companyName", companyName);
    company.append("ceoName", ceoName);
    company.append("difficulty", difficulty);
    const res = await fetch("http://localhost/api/login", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(company))
    });
    return await res.json();
  }

  UpdateRemote(gamespeed) {
    var update = new FormData();
    update.append("gameId", util.getGameId());
    update.append("ceoId", util.getCeoId());
    update.append("gameSpeed", gamespeed);
    fetch('http://localhost/api/update/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(update))
    }).then(Update())
  }



  async Update() {
    const res = await fetch("http://localhost/api/update/");
    if (res.status == 200)
      return res.json();
    else
      util.clearLocalStorage();
  }

  CheckMarket(market, date) {
    market.forEach(p => {
      if (this.marketNames.includes(p.name))
        return

      this.marketNames.push(p.name)
      OpenNewspaper(p.name, p.company, p.price, p.description, date)
    });
  }

  async StartResearch(researchName) {

    let researchRequest = new FormData()
    researchRequest.append("gameId", util.getGameId())
    researchRequest.append("ceoId", util.getCeoId())
    researchRequest.append("researchProject", researchName)

    const res = await fetch("http://localhost/api/research/", {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(Object.fromEntries(researchRequest))
    });
    return await res.json();
  }

  GetResearchList() {
    var researchableList = document.getElementById("researchable-table");
    var researchedList = document.getElementById("researched");
    util.removeElementsByClass("researched-modal-item");
    util.removeElementsByClass("researchable-modal-item");

    fetch("http://localhost/api/research/?gameId=" + util.getGameId() + "&ceoId=" + util.getCeoId())
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
            tr.addEventListener("click", () => this.StartResearch(research.name))
            researchableList.appendChild(tr);
          }
          else
            researchedList.appendChild(div);

        });
      });
  }
}