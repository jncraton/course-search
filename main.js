import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')

const filterConsent = document.querySelector('#filterConsent')
const selectday = document.getElementById('selecteddays')

const applyButton = document.querySelector('#applybutton')

let currentCourses    // current version of the courses displayed


function filterCourses() {
  // If the checkbox is checked, only show "Consent Needed" courses
  if (filterConsent.checked) {
      currentCourses = currentCourses.filter(course => course.consent === 'Consent Required')
    }

  // Filter days selected
  currentCourses = currentCourses.filter(course => course.days.includes(selectday.value))

}

function sortCourses() {
  // TODO: add sorting logic here
}

function renderTable() {
  tbody.innerHTML = '' // clear rows first
  currentCourses = courses // reset current courses

  filterCourses()
  sortCourses()

  // Go through the current array of courses and display them
  currentCourses.forEach(course => {
    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    tds[0].textContent = `${course.crse} - ${course.descr}`
    tds[1].textContent = course.days
    tds[2].textContent = course.consent

    tbody.append(row)
  })
}

// Initial render
renderTable()

// Render again when user wants to
applyButton.addEventListener('click', renderTable)
