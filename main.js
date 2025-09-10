import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#course-row')

const filterConsent = document.querySelector('#filter-consent')
const selectDay = document.querySelector('#selected-days')

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

  // TODO: Future filter logic can go here
}

// This function will contain -> filter by enrolment and filter by courses
function sortCourses() {
  // Comperacent elements like a tree
  function compareCourses(a, b) {
    return a.enrolled - b.enrolled
  }

  // Creating function that would be responsible for maxValue
  // Creating the ...courses from courses and putting the course into sortenrolledmaxmin where we taken only enrolled and compare them
  function maxValue() {
    const sortenrolledmaxmin = [...currentCourses].sort(compareCourses)

    tbody.innerHTML = ''

    sortenrolledmaxmin.forEach(course => {
      const row = template.content.cloneNode(true)
      row.querySelectorAll('td')[0].textContent =
        `${course.crse} - ${course.descr}`
      row.querySelectorAll('td')[1].textContent = course.days
      row.querySelectorAll('td')[2].textContent = course.consent
      row.querySelectorAll('td')[3].textContent = course.enrolled
      tbody.append(row)
    })
  }

  // Creating function that would be responsible for minValue
  // Creating the ...courses from courses and putting the course into sortenrolledmaxmin where we taken only enrolled and compare them
  function mincompareCourses(a, b) {
    return b.enrolled - a.enrolled
  }

  // Using Prof.Craton code but adding the const that we created
  function minValue() {
    const sortenrolledmaxmin = [...currentCourses].sort(mincompareCourses)

    tbody.innerHTML = ''

    sortenrolledmaxmin.forEach(course => {
      const row = template.content.cloneNode(true)
      row.querySelectorAll('td')[0].textContent =
        `${course.crse} - ${course.descr}`
      row.querySelectorAll('td')[1].textContent = course.days
      row.querySelectorAll('td')[2].textContent = course.consent
      row.querySelectorAll('td')[3].textContent = course.enrolled

      tbody.append(row)
    })
  }

  function notActive() {
    tbody.innerHTML = ''

    currentCourses.forEach(course => {
      const row = template.content.cloneNode(true)
      row.querySelectorAll('td')[0].textContent =
        `${course.crse} - ${course.descr}`
      row.querySelectorAll('td')[1].textContent = course.days
      row.querySelectorAll('td')[2].textContent = course.consent
      row.querySelectorAll('td')[3].textContent = course.enrolled

      tbody.append(row)
    })
  }

  document.getElementById('min-max').addEventListener('click', maxValue)
  document.getElementById('max-min').addEventListener('click', minValue)
  document.getElementById('notactive').addEventListener('click', notActive)
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
    tds[3].textContent = course.enrolled

    tbody.append(row)
  })
}

// Initial render
renderTable()

// Render again when user wants to
applyButton.addEventListener('click', renderTable)
