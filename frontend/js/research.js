import {API} from "./api.js";
import { Modal } from "./modal.js";


export class ResearchProject {
    name = "none";
    startDate = new Date();
    finishDate = new Date();

    constructor(name, startDate, finishDate) {
        this.startDate = startDate
        this.finishDate = finishDate
        this.name = name
    }
}

export class Research {
    API = new API()
    modal = new Modal();
    circle = null
    radius = null
    circumference = null

    setupProgressRing() {
        this.circle = document.querySelector('circle')
        this.radius = this.circle.r.baseVal.value
        this.circumference = this.radius * 2 * Math.PI
        this.circle.style.strokeDasharray = `${this.circumference} ${this.circumference}`
        this.circle.style.strokeDashoffset = `${this.circumference}`
    }
    SetProgress(percent) {
        const offset = this.circumference - percent / 100 * this.circumference;
        this.circle.style.strokeDashoffset = offset;
    }
    UpdateProgress() {

        var dayspassed = API.currentDate - API.researchProject.startDate
        var research_days = API.researchProject.finishDate - API.researchProject.startDate
        var progress = (dayspassed / research_days) * 100
        if (progress <= 100) {
            document.getElementById("research-progress").innerHTML = localStorage.getItem("research_name")
            SetProgress("" + progress)
        }
        else {
            SetProgress("0")
            document.getElementById("research-progress").innerHTML = ""
            modal.ShowMessage(API.researchProject.name + " finished!", 10, 52, "still-message")
            clearTimeout(API.progressicontimer)
        }
    }

    StartResearch(projectName)
    {

    }
}