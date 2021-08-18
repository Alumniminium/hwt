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
function Researches(){
  researchableList =document.getElementById("researchable")
  researchedList =document.getElementById("researchable")

  
  while (researchedList.firstChild) {
    researchedList.removeChild(researchedList.lastChild);
  }
  fetch("http://localhost/api/research/?playerId=" + id)
  .then(res => res.json())
  .then(data => {
    removeElementsByClass("researched-modal-item")
    removeElementsByClass("researchable-modal-item")
    data.forEach(research => {
      if(research.price == 0)
      {
        var researched = document.createElement('div');  
        researched.textContent = research.name;    
        researched.style.backgroundColor = "#252";
        researchedList.appendChild(researched);   
      }
      else{
        var researchable = document.createElement('div');  
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