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

const getDept = crse => crse.split('-', 1)[0]
const daysCount = crse => Math.max(1, crse.days.trim().length)

function filterCourses(source) {
  return source.filter(
    c =>
      (filterBox.value == '__ALL__' || getDept(c.crse) === filterBox.value) &&
      (!filterConsent.checked || c.consent === 'Consent Required') &&
      (!selectDay.value || (c.days || '').includes(selectDay.value)) &&
      (!filterOnline.checked || c['instruction mode'].includes('Online')),
  )
}

function sortCourses(visible) {
  // Logic for enrollment sorting
  switch (clickCountEnrollment) {
    case 1:
      visible = [...visible].sort(
        (a, b) => (a.enrolled ?? 0) - (b.enrolled ?? 0),
      )

      filterEnrollment.setAttribute(
        'aria-label',
        'Sort by Descending Enrollment',
      )
      break
    case 2:
      visible = [...visible].sort(
        (a, b) => (b.enrolled ?? 0) - (a.enrolled ?? 0),
      )

      filterEnrollment.setAttribute('aria-label', 'Default Enrollment order')
      break
    default:
      visible = [...visible]

      filterEnrollment.setAttribute(
        'aria-label',
        'Sort by Ascending Enrollment',
      )
      break
  }

  // Logic for credit sorting
  switch (clickCountCredit) {
    case 1:
      visible = [...visible].sort((a, b) => daysCount(a) - daysCount(b))

      filterCredit.setAttribute('aria-label', 'Sort by Credit Descending')
      break
    case 2:
      visible = [...visible].sort((a, b) => daysCount(b) - daysCount(a))

      filterCredit.setAttribute('aria-label', 'Default Credit order')
      break
    default:
      visible = [...visible]

      filterCredit.setAttribute('aria-label', 'Sort by Credit Ascending')
      break
  }

  return visible
}

// get unique department codes
function populateDeptFilter() {
  const depts = Array.from(new Set(courses.map(c => getDept(c.crse)))).sort()

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

  let visible = filterCourses(courses)

  visible = sortCourses(visible)

  // Go through the current array of courses and display them (assumes things are filtered and sorted)
  visible.forEach(course => {
    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    const classStatusVisual =
      course.enrolling === 'Open' ? 'Open &#9989;' : 'Closed &#10060;' // Adds visual for if class is open or not with UTF encoded version of emojis

    tds[0].textContent = getDept(course.crse)
    tds[1].textContent = course.crse.split('-').slice(1).join('-')
    tds[2].textContent = course.descr
    tds[3].textContent = course.days
    tds[4].textContent = course.consent
    tds[5].textContent = course.enrolled
    tds[6].textContent = daysCount(course)
    tds[7].textContent = course['instruction mode']
    tds[8].innerHTML = `${classStatusVisual}`

    tbody.append(row)
  })
}

// Add event listeners to all the select dropdowns and input checkboxes
inputElements.forEach(element => {
  element.addEventListener('change', renderTable)
})

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
