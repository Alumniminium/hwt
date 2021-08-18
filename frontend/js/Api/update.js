function update()
{
    fetch("http://localhost/api/update/?playerId=" + id)
  .then(res => res.json())
  .then(data => {
    document.getElementById("date").innerHTML = data.date
    document.getElementById("money").innerHTML = "money "+data.money
    document.getElementById("research-progress").innerHTML = "research progress "+data.researchProgress
    document.getElementById("product-progress").innerHTML = "development progress "+data.developmentProgress
    
    });  
}
function removeElementsByClass(className) {
  const elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}
function Researches(){
  researchableList =document.getElementById("researchable")
  researchedList =document.getElementById("researchable")
  removeElementsByClass("researched-modal-item")
  removeElementsByClass("researchable-modal-item")
  fetch("http://localhost/api/research/?playerId=" + id)
  .then(res => res.json())
  .then(data => {
    data.forEach(research => {
      if(research.price == 0)
      {
        var researched = document.createElement('div');
        researched.className = "researched-modal-item"
        researched.textContent = research.name;    
        researched.style.backgroundColor = "#252";
        researchedList.appendChild(researched);   
      }
      else{
        var researchable = document.createElement('div');
        researchable.className = "researchable-modal-item"
        researchable.textContent = research.name;    
        researchable.style.backgroundColor = "#213";
        researchable.addEventListener("click", function() {
          StartResearch(research.name)
      });
      researchableList.appendChild(researchable);   
      }
    });
    });  
}
function StartResearch(){
  alert("bullshit")
}