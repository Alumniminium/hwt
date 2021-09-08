import { API } from "./api.js";

export class Modal {

    setupModals() {
        document.onkeydown = (evt) => {
            if (evt.key === "Escape" || evt.key === "Esc")
                this.CloseAllModals();
        };
        [...document.getElementsByClassName("modalheader")].forEach(e => {
            this.dragElement(e);
        });
        document.getElementById("newspaper-close-btn").addEventListener("click", () => this.CloseModal('newspapermodal'));
        document.getElementById("develop-product-close-btn").addEventListener("click", () => this.CloseModal('develop-product'));
        document.getElementById("research-close-btn").addEventListener("click", () => this.CloseModal('research'));
        document.getElementById("market-analysis-close-btn").addEventListener("click", () => this.CloseModal('market-analysis'));
        document.getElementById("advertising-campaign-close-btn").addEventListener("click", () => this.CloseModal('advertising-campaign'));
    }

    ShowMessage(message, x, y, style) {
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

    OpenModal(modalname) {
        var modal = document.getElementById(modalname)
        modal.style.display = "grid"
        switch (modalname) {
            case "research":
                API.prototype.GetResearchList();
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
    }
    CloseModal(modal) {
        var e = document.getElementById(modal)
        e.style.display = "none"
    }

    CloseAllModals() {
        [...document.getElementsByClassName("modal")].forEach(element => element.style.display = "none")
    }

    dragElement(elmnt) {
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
}