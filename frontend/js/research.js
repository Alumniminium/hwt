import * as api from "./api.js";
import { ShowMessage } from "./modal.js";

let circle = null
let radius = null
let circumference = null;

export class ResearchProject {
    name="none";
    startDate = new Date();
    finishDate = new Date();

    constructor(name, startDate, finishDate) {
        this.startDate = startDate
        this.finishDate = finishDate
        this.name = name
    }
}

export function setupProgressRing() {
    circle = document.querySelector('circle')
    radius = circle.r.baseVal.value
    circumference = radius * 2 * Math.PI
    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = `${circumference}`
}
export function SetProgress(percent) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}
export function UpdateProgress() {

    var dayspassed = api.currentDate - api.researchProject.startDate
    var research_days = api.researchProject.finishDate - api.researchProject.startDate
    var progress = (dayspassed / research_days) * 100
    if (progress <= 100) {
        document.getElementById("research-progress").innerHTML = localStorage.getItem("research_name")
        SetProgress("" + progress)
    }
    else {
        SetProgress("0")
        document.getElementById("research-progress").innerHTML = ""
        ShowMessage(api.researchProject.name + " finished!", 10, 52, "still-message")
        clearTimeout(api.progressicontimer)
    }
}
