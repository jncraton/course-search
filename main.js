import { courses } from './courses.js'

const classNumberBox = document.getElementById('classNumberFilter')
const classSizeButton = document.getElementById('filterBySize')

let hideRequirement = false
let courseNumberFilter = ''
let classSize = ''

// Renders the table based on the above variables
function render() {
	let sortedCourses = [...courses]

	if (classSize) {
		sortedCourses.sort((a, b) => b.ENROLLED - a.ENROLLED)
		if (classSize === 'low') sortedCourses.reverse()
	}

	if (courseNumberFilter) {
		sortedCourses = sortedCourses.filter((course) => course.CRSE.includes(courseNumberFilter.toUpperCase()))
	}

	const rows = sortedCourses.map((course) => {
		// Checks if the hide consent checkbox is checked, and if so, returns and does not render add other filters HERE
		if (hideRequirement && course.CONSENT === 'Instructor Consent Required') {
			return ''
		} else {
			return `<tr><td>${course.CRSE}</td><td>${course.DESCR}</td><td>${course.INSTR}</td><td>${course.DAYS}</td><td>${course.ENROLLED}</td></tr>`
		}
	})

	document.querySelector('tbody').innerHTML = rows.join('')
}

/*
 * Event listener on checkbox that hides courses requiring special consent
 */
document.getElementById('hide-courses-requiring-consent').addEventListener('click', () => {
	hideRequirement = !hideRequirement
	render()
})

classSizeButton.addEventListener('click', () => {
	if (classSizeButton.innerText.includes('∧')) {
		classSizeButton.innerText = classSizeButton.innerText.substr(0, classSizeButton.innerText.length - 1) + '∨'
		classSize = 'low'
	} else if (classSizeButton.innerText.includes('∨')) {
		classSizeButton.innerText = classSizeButton.innerText.substr(0, classSizeButton.innerText.length - 1)
		classSize = ''
	} else {
		classSizeButton.innerText += ' ∧'
		classSize = 'high'
	}
	render()
})

classNumberBox.addEventListener('keyup', () => {
	courseNumberFilter = classNumberBox.value
	render()
})

render()
