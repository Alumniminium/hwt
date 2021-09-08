export function clearLocalStorage() {
    localStorage.clear()
    window.location.replace("index.html")
}

export function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0)
        elements[0].parentNode.removeChild(elements[0]);
}

export function getGameId() {

    var gameId = localStorage.getItem("gameId");
    if (gameId == null)
        return -1
    else
        return gameId;
}
export function getCeoId() {
    var ceoId = localStorage.getItem("ceoId");
    if (ceoId == null)
        return -1
    else
        return ceoId;
}
export function checkId() 
{
    if ((getGameId() == null || getGameId() == -1) && (getCeoId() == null || getCeoId() == -1)) {
        return false;
    }
    else {
        console.log("gameId = " + getGameId())
        return true;
    }
}