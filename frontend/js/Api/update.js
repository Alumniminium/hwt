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
      document.getElementById("date").innerHTML = json.date
      document.getElementById("money").innerHTML = "$ " + new Intl.NumberFormat('en-US').format(json.money)
      document.getElementById("research-progress").innerHTML = "researching " + "{research name}" + ": " + json.researchProgress + "%"
      document.getElementById("product-progress").innerHTML = "developing " + "{product name}" + ": " + json.developmentProgress + "%"
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
    .then(json => alert(json.debugInfo))
  CloseAllModals()
}

function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}