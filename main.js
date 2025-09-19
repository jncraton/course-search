import { courses } from './courses.js'

// html elements
const tbody = document.querySelector('tbody')
const template = document.querySelector('#course-row')
const filterConsent = document.querySelector('#filter-consent')
const selectDay = document.querySelector('#selected-days')
const filterOnline = document.querySelector('#filter-online')
const filterBox = document.querySelector('#filterDepartment')
const filterCredit = document.querySelector('#credit-button')
const filterEnrollment = document.querySelector('#enrollments-button')
const inputElements = document.querySelectorAll('select, input')

//Click count vars
let clickCountEnrollment = 0
let clickCountCredit = 0

courses.forEach(crse => {
  crse.dept = crse => crse.split('-', 1)[0]
  crse.hours = Math.max(1, crse.days.trim().length)
})

function sortCourses(visible) {
  // Logic for enrollment sorting
  switch (clickCountEnrollment) {
    case 1:
      visible.sort((a, b) => (a.enrolled ?? 0) - (b.enrolled ?? 0))
      filterEnrollment.setAttribute('aria-label', 'Sort Descending')
      break
    case 2:
      visible.sort((a, b) => (b.enrolled ?? 0) - (a.enrolled ?? 0))

      filterEnrollment.setAttribute('aria-label', 'Default order')
      break
    default:
      filterEnrollment.setAttribute('aria-label', 'Sort Ascending')
      break
  }

  // Logic for credit sorting
  switch (clickCountCredit) {
    case 1:
      visible.sort((a, b) => a.hours - b.hours)
      filterCredit.setAttribute('aria-label', 'Sort Descending')
      break
    case 2:
      visible = [...visible].sort((a, b) => b.hours - a.hours)
      filterCredit.setAttribute('aria-label', 'Default order')
      break
    default:
      filterCredit.setAttribute('aria-label', 'Sort Ascending')
      break
  }

  return visible
}

function populateDeptFilter() {
  // get unique department codes
  const depts = Array.from(new Set(courses.map(c => c.dept))).sort()

  // add option for each department
  depts.forEach(dept => {
    const opt = document.createElement('option')
    opt.value = opt.textContent = dept
    filterBox.append(opt)
  })
}

function renderTable() {
  tbody.innerHTML = '' // clear rows first

  let visible = courses.filter(
    c =>
      (filterBox.value == '__ALL__' || c.dept === filterBox.value) &&
      (!filterConsent.checked || c.consent === 'Consent Required') &&
      (!selectDay.value || (c.days || '').includes(selectDay.value)) &&
      (!filterOnline.checked || c['instruction mode'].includes('Online')),
  )

  visible = sortCourses(visible)

  // Go through the current array of courses and display them (assumes things are filtered and sorted)
  visible.forEach(course => {
    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    const openClosedIcon = course.enrolling === 'Open' ? '&#9989;' : '&#10060;'

    tds[0].textContent = course.dept
    tds[1].textContent = course.crse.split('-').slice(1).join('-')
    tds[2].textContent = course.descr
    tds[3].textContent = course.days
    tds[4].textContent = course.consent
    tds[5].textContent = course.enrolled
    tds[6].textContent = course.hours
    tds[7].textContent = course['instruction mode']
    tds[8].innerHTML = `${course.enrolling} ${openClosedIcon}`

    tbody.append(row)
  })
}

// Add event listeners to all the select dropdowns and input checkboxes
inputElements.forEach(el => el.addEventListener('change', renderTable))

// Enrollment filter button event list.
filterEnrollment.addEventListener('click', () => {
  clickCountEnrollment = (clickCountEnrollment % 3) + 1
  clickCountCredit = 0
  renderTable()
})

// Credit filter button event list.
filterCredit.addEventListener('click', () => {
  clickCountCredit = (clickCountCredit % 3) + 1
  clickCountEnrollment = 0
  renderTable()
})

// Initial render
populateDeptFilter()
renderTable()
