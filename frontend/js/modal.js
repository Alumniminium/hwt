import * as api from "./api.js";

let contextMenu = document.getElementById("context-menu");

export function setupModals()
{
    document.onkeydown = function (evt) {
        if (evt.key === "Escape" || evt.key === "Esc")
            CloseAllModals();
    };
    [...document.getElementsByClassName("modalheader")].forEach(e => {
        dragElement(e);
    });
    document.getElementById("newspaper-close-btn").addEventListener("click", ()=> CloseModal('newspapermodal'));
    document.getElementById("develop-product-close-btn").addEventListener("click", () =>CloseModal('develop-product'));
    document.getElementById("research-close-btn").addEventListener("click", () => CloseModal('research'));
    document.getElementById("market-analysis-close-btn").addEventListener("click", () => CloseModal('market-analysis'));
    document.getElementById("advertising-campaign-close-btn").addEventListener("click", () => CloseModal('advertising-campaign'));
}

export function ShowMessage(message, x, y, style) {
    if (document.getElementsByClassName(style).length > 5) {
        document.getElementsByClassName(style)[0].remove()
    }
    var messageElement = document.createElement("div")
    messageElement.classList.add(style);
    messageElement.innerHTML = message
    messageElement.style.top = "" + y + "px"
    messageElement.style.left = "" + x + "px"
    document.body.appendChild(messageElement)
}

export function OpenModal(modalname) {
    var modal = document.getElementById(modalname)
    modal.style.display = "grid"
    switch (modalname) {
        case "research":
            api.Researches()
            break;
        case "develop-product":

            break;
        case "market-analysis":

            break;
        case "advertising-campaign":

            break;
        default:
            break;
    }
    contextMenu.style.display = "none"
}
export function CloseAllModals() {
    [...document.getElementsByClassName("modal")].forEach(element => element.style.display = "none")
}
export function CloseModal(modal) {
    var e = document.getElementById(modal)
    e.style.display = "none"
}


export function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.parentElement.style.top = (elmnt.parentElement.offsetTop - pos2) + "px";
        elmnt.parentElement.style.left = (elmnt.parentElement.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}