import { Modal } from "./modal.js";
import { clearLocalStorage } from "./utility.js";

export class ContextMenu {
    contextMenu = document.getElementById("context-menu");
    Modal = new Modal();
    setupContextMenu() {
        console.log("Context Menu setup starting...")
        var gamecontainer = document.getElementById("game-container")
        gamecontainer.addEventListener("contextmenu", (event) => this.toggleVisibility(event))
        gamecontainer.addEventListener("click", (event) => this.toggleVisibility(event))

        var develop = document.getElementById("develop-product-contextmenu-item");
        var researc = document.getElementById("research-contextmenu-item");
        var market = document.getElementById("market-analysis-contextmenu-item");
        var ad = document.getElementById("advertising-campaign-contextmenu-item");
        var debg = document.getElementById("debug-clearlocalstorage-contextmenu-item");

        develop.addEventListener("click", (e) => {
            this.Modal.OpenModal('develop-product');
            this.toggleVisibility(e);
        });
        researc.addEventListener("click", (e) => {
            this.Modal.OpenModal('research');
            this.toggleVisibility(e);
        });
        market.addEventListener("click", (e) => {
            this.Modal.OpenModal('market-analysis');
            this.toggleVisibility(e);
        });
        ad.addEventListener("click", (e) => {
            this.Modal.OpenModal('advertising-campaign');
            this.toggleVisibility(e);
        });
        debg.addEventListener("click", () => clearLocalStorage());
        console.log("Context Menu setup finished!")
    }

    toggleVisibility(event) {
        event.preventDefault()
        this.contextMenu.style.top = "" + event.clientY + "px"
        this.contextMenu.style.left = "" + event.clientX + "px"
        
        if (this.contextMenu.style.display == "block")
            this.contextMenu.style.display = "none"
        else
            this.contextMenu.style.display = "block"
    }
}