import { courses } from './courses.js'

// html elements
const tbody = document.querySelector('tbody')
const template = document.querySelector('#course-row')
const filterConsent = document.querySelector('#filter-consent')
const selectDay = document.querySelector('#selected-days')
const filterOnline = document.querySelector('#filter-online')
const filterBox = document.querySelector('#filterDepartment')
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
// get course code to return just department
const getDept = crse => crse.split('-', 1)[0]

// get unique department codes
function populateDeptFilter() {
  const depts = Array.from(new Set(courses.map(c => getDept(c.crse)))).sort()

  filterBox.innerHTML = ''

  // Add all department option
  const allOpt = document.createElement('option')
  allOpt.value = '__ALL__'
  allOpt.textContent = 'ALL DEPARTMENTS'
  filterBox.append(allOpt)

  // add option for each department
  depts.forEach(d => {
    const opt = document.createElement('option')
    opt.value = d
    opt.textContent = d
    filterBox.append(opt)
  })
}

function renderTable() {
  tbody.innerHTML = '' // clear rows first

// show courses based on filter
  const selectedDept = filterBox.value
  let visible;
  if (selectedDept && selectedDept !== '__ALL__') {
    visible = courses.filter(c => getDept(c.crse) === selectedDept);
  } else {
    visible = courses;
  }

  currentCourses = visible
  filterCourses()

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
    tds[4].textContent = daysCount(course)
    tds[5].textContent = course['instruction mode']
    tds[6].textContent = getDept(course.crse)
    tds[7].textContent = course.crse.split('-').slice(1).join('-')
    tds[8].textContent = course.descr

    tbody.append(row)
  })
}

// Make each day count as 1 credit hour and if it's online "" also 1 credit hour
function daysCount(currentCourses) {
  if (
    typeof currentCourses.days === 'string' &&
    currentCourses.days.trim() !== ''
  ) {
    return currentCourses.days.trim().length
  } else {
    return 1
  }
}

// This function will contain -> filter by enrolment and filter by courses
function sortCourses(sortType) {
  // Decision logic for deciding how to sort by enorllment
  if (sortType === 'not-active') {
    currentCourses = courses
    filterCourses()
  } else if (sortType === 'min-max-enrollment') {
    currentCourses = [...currentCourses].sort((a, b) => a.enrolled - b.enrolled)
  } else if (sortType === 'max-min-enrollment') {
    currentCourses = [...currentCourses].sort((a, b) => b.enrolled - a.enrolled)
    // Decision logic for deciding how to sort by credit hours
    // Make each day count as 1 credit hour and if it's online "" also 1 credit hour
  } else if (sortType === 'min-max-credit-hours') {
    currentCourses = [...currentCourses].sort(
      (a, b) => daysCount(a) - daysCount(b),
    )
  } else if (sortType === 'max-min-credit-hours') {
    currentCourses = [...currentCourses].sort(
      (a, b) => daysCount(b) - daysCount(a),
    )
  }

  // Render the table after
  renderTable()
}

// Initial set current courses and render
populateDeptFilter()
currentCourses = courses
renderTable()

// Render again when user wants to for filtering
applyButton.addEventListener('click', () => {
  currentCourses = courses // reset current courses
  renderTable()
})

filterBox.addEventListener('change', renderTable)

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
document
  .getElementById('min-max-credit-hours')
  .addEventListener('click', () => sortCourses('min-max-credit-hours'))
document
  .getElementById('max-min-credit-hours')
  .addEventListener('click', () => sortCourses('max-min-credit-hours'))
