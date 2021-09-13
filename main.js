import { courses } from "./courses.js"

let hideRequirement = false

function render() {
	let rows = courses.map((course) => {
		/**
		 * Add Filters Here
		 */

		//Checks if the hide consent checkbox is checked, and if so, returns and does not render
		if (hideRequirement && course.CONSENT === "Instructor Consent Required") {
			return
		} else {
			return `<tr><td>${course.CRSE}</td><td>${course.DESCR}</td><td>${course.INSTR}</td><td>${course.DAYS}</td></tr>`
		}
	})

	document.querySelector("tbody").innerHTML = rows.join("")
}

/*
 * Event listener on checkbox that hides courses requiring special consent
 */
document.getElementById("hide-courses-requiring-consent").addEventListener("click", () => {
	hideRequirement = !hideRequirement
	render()
})

render()
