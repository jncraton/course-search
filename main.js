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

function renderTable() {
  tbody.innerHTML = '' // clear rows first

  // Go through the current array of courses and display them (assumes things are filtered and sorted)
  currentCourses.forEach(course => {
    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    const classStatusVisual =
      course.enrolling === 'Open' ? '&#9989;' : '&#10060;' // Adds visual for if class is open or not with UTF encoded version of emojis

    tds[0].innerHTML = `${classStatusVisual} ${course.crse} - ${course.descr}`
    tds[1].textContent = course.days
    tds[2].textContent = course.consent
    tds[3].textContent = course.enrolled
    tds[5].textContent = course['instruction mode']

    tbody.append(row)
  })
}

// This function will contain -> filter by enrolment and filter by courses
function sortCourses(sortType) {
  // Decision logic for deciding how to sort
  if (sortType === 'not-active') {
    currentCourses = courses
    filterCourses()
  } else if (sortType === 'min-max-enrollment') {
    currentCourses = [...currentCourses].sort((a, b) => a.enrolled - b.enrolled)
  } else if (sortType === 'max-min-enrollment') {
    currentCourses = [...currentCourses].sort((a, b) => b.enrolled - a.enrolled)
  }

  // Render the table after
  renderTable()
}

// Initial set current courses and render
currentCourses = courses
renderTable()

// Render again when user wants to for filtering
applyButton.addEventListener('click', () => {
  currentCourses = courses // reset current courses

  filterCourses()
  renderTable()
})

// Auto render for sorting
document
  .getElementById('min-max-enrollment')
  .addEventListener('click', () => sortCourses('min-max-enrollment'))
document
  .getElementById('max-min-enrollment')
  .addEventListener('click', () => sortCourses('max-min-enrollment'))
document
  .getElementById('not-active')
  .addEventListener('click', () => sortCourses('not-active'))
