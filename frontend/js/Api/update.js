let id = localStorage.getItem("id")

function ApiUpdate() {
  fetch("http://localhost/api/update/?playerId=" + id)
    .then(res => {
      if (res.status == 200)
        return res.json()
      else {
        ClearLocalStorage()
      }
    })
    .then(json => {
      document.getElementById("date").innerHTML = new Date(json.date).toLocaleDateString("en-US")
      document.getElementById("money").innerHTML = "$ " + new Intl.NumberFormat('en-US').format(json.money)
      CheckMarket(json.market)
    });
}

function Researches() {
  researchableList = document.getElementById("researchable")
  researchedList = document.getElementById("researched")
  removeElementsByClass("researched-modal-item")
  removeElementsByClass("researchable-modal-item")

  fetch("http://localhost/api/research/?playerId=" + id)
    .then(res => res.json())
    .then(data => {
      data.forEach(research => {
        var div = document.createElement('div');
        div.textContent = research.name;
        div.className = "researched-modal-item"

        if (research.price == 0)
          researchedList.appendChild(div);
        else {
          div.className = "researchable-modal-item"
          div.addEventListener("click", function () { StartResearch(research.name) })
          researchableList.appendChild(div);
        }

      });
    });
}

function StartResearch(researchName) {
  let researchRequest = new FormData()
  researchRequest.append("playerId", id)
  researchRequest.append("researchProject", researchName)
  fetch("http://localhost/api/research", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(Object.fromEntries(researchRequest))
  }).then(res => res.json())
  .then(data => {
      if(!data.success)
      {
        alert(data.debugInfo)
      }
      else{
        localStorage.setItem("research_days",data.secondsUntilDone)
        localStorage.setItem("research_days_passed", 0)
        localStorage.setItem("research_name",researchName)
        PopMessage("Starting" + researchName, 270, 300)
        progressicontimer = setInterval(UpdateProgress,33) 
      }

    });
  CloseAllModals()
}
function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}