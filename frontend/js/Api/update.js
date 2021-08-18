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
function AvailableResearch(){
  fetch("http://localhost/api/availableResearch/?playerId=" + id)
  .then(res => res.json())
  .then(data => {
    
    data.forEach(research => {
      var div = document.createElement('div');  
      div.textContent = research.name;    
      div.style.backgroundColor = "#213";
      document.getElementById("researchable").appendChild(div);   
    });
    
    });  
}
function research(){
  
}