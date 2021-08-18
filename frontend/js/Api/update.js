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