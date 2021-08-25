function OpenNewspaper()
{
    document.getElementById("newspapermodal").style.display = "block"
}
function CloseNewspaper()
{
    document.getElementById("newspaper").style.display = "none"

}
function ProductColumn(researchname, founder, company, price, description)
{
    var productColumn = document.getElementById("product-column")
    var headline = productColumn.getElementsByClassName("headline hl3")[0];
    var article = document.getElementById("article")

    headline.innerHTML = company.toUpperCase() + " RELEASED THE " + researchname.toUpperCase()
    article.innerHTML = description
}
function NewsColumn()
{

}
function AdvertColumn()
{
    
}