function OpenNewspaper(productName, company, price, description, date) {
    var productColumn = document.getElementById("product-column")
    
    var headline = productColumn.getElementsByClassName("headline hl3")[0];
    var article = document.getElementById("article")
    var priceElement = productColumn.getElementsByClassName("headline hl4")[0]
    var datetime = document.getElementById("datetime")
    var image = document.getElementById("product-image")
    image.src = "/images/"+company+"/"+productName+".webp";

    date = new Date(date)
    datetime.innerHTML = date.getDay() + ". " + date.toLocaleString('default', { month: 'long' }) + ", " +date.getFullYear()
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