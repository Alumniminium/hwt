function AvailableResearch(){
    techname = "available"
    var div = document.createElement('div');  
    div.textContent = techname;    
    div.style.backgroundColor = "#213";
    document.getElementById("researchable").appendChild(div);   
}