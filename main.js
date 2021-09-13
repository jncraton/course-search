import { courses } from './courses.js'

let closedClass = ''
const rows = courses.map((course) => {
  if (course.ENROLLING === 'Open') {
    closedClass = 'openClass'
  } else {
    closedClass = 'closedClass'
  }
  return `<tr class = ${closedClass}><td>${course.CRSE} - ${course.DESCR}</td></tr>`


let hideRequirement = false

// Renders the table based on the above variables
function render () {
  const rows = courses.map((course) => {
    // Checks if the hide consent checkbox is checked, and if so, returns and does not render add other filters HERE
    if (hideRequirement && course.CONSENT === 'Instructor Consent Required') {
      return ''
    } else {
      return `<tr><td>${course.CRSE}</td><td>${course.DESCR}</td><td>${course.INSTR}</td><td>${course.DAYS}</td></tr>`
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

render()
