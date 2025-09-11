import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#course-row')

const filterConsent = document.querySelector('#filter-consent')
const selectDay = document.querySelector('#selected-days')
const filterOnline = document.querySelector('#filter-online')

const applyButton = document.querySelector('#apply-button')

let currentCourses // current version of the courses displayed

function filterCourses() {
  // If the checkbox is checked, only show "Consent Needed" courses
  if (filterConsent.checked) {
    currentCourses = currentCourses.filter(
      course => course.consent === 'Consent Required',
    )
  }

  // Filter days selected
  currentCourses = currentCourses.filter(course =>
    course.days.includes(selectDay.value),
  )

  //If the checkbox is checked, show online courses
  if (filterOnline.checked) {
    currentCourses = currentCourses.filter(course => course.crse[11] == 'E')
  }

  // TODO: Future filter logic can go here
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

    const classStatusVisual =
      course.enrolling === 'Open' ? '&#9989;' : '&#10060;' // Adds visual for if class is open or not with UTF encoded version of emojis

    tds[0].innerHTML = `${classStatusVisual} ${course.crse} - ${course.descr}`
    tds[1].textContent = course.days
    tds[2].textContent = course.consent

    tbody.append(row)
  })
}

// Initial render
renderTable()

// Render again when user wants to
applyButton.addEventListener('click', renderTable)
