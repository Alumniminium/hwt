function OpenNewspaper(productName, company, price, description) {
    var productColumn = document.getElementById("product-column")
    
    var headline = productColumn.getElementsByClassName("headline hl3")[0];
    var article = document.getElementById("article")
    var priceElement = productColumn.getElementsByClassName("headline hl4")[0]
    
    headline.innerHTML = company.toUpperCase() + " RELEASED THE " + productName.toUpperCase()
    article.innerHTML = description
    priceElement.innerHTML = "available now for $" + price + ""
    
    document.getElementById("newspapermodal").style.display = "block"
}
function CloseNewspaper() {
    document.getElementById("newspaper").style.display = "none"
}

function NewsColumn() {

}
function AdvertColumn() {

}