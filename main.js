import { courses } from './courses.js'

// html elements
const tbody = document.querySelector('tbody')
const template = document.querySelector('#course-row')
const filterConsent = document.querySelector('#filter-consent')
const selectDay = document.querySelector('#selected-days')
const filterOnline = document.querySelector('#filter-online')
const filterBox = document.querySelector('#filterDepartment')
const liberalArtsCheckbox = document.querySelector('#liberal-arts-filter')
const filterCredit = document.querySelector('#credit-button')
const filterEnrollment = document.querySelector('#enrollments-button')
const downIconEnrollment = document.querySelector(
  '#enrollments-button .down-icon',
)
const upIconEnrollment = document.querySelector('#enrollments-button .up-icon')
const downIconCredit = document.querySelector('#credit-button .down-icon')
const upIconCredit = document.querySelector('#credit-button .up-icon')

const inputElements = document.querySelectorAll('select, input')

//Click count vars
let clickCountEnrollment = 0
let clickCountCredit = 0

const getDept = crse => crse.split('-', 1)[0]

function daysCount(course) {
  if (typeof course.days === 'string' && course.days.trim() !== '') {
    return course.days.trim().length
  }
  return 1
}

function filterCourses(source) {
  let arr = source
  // If the checkbox is checked, only show "Consent Needed" courses
  if (filterConsent.checked) {
    arr = arr.filter(c => c.consent === 'Consent Required')
  }

  // Filter days selected
  if (selectDay.value) {
    arr = arr.filter(c => (c.days || '').includes(selectDay.value))
  }

  //If the checkbox is checked, show online courses
  if (filterOnline.checked) {
    arr = arr.filter(c => c['instruction mode'] === 'Asynchronous Online')
  }

  // Liberal Arts filter
  if (liberalArtsCheckbox.checked) {
    arr = arr.filter(c => {
      const title = (c.title || '').toLowerCase()
      const descr = (c.descr || '').toLowerCase()
      return title.includes('liberal arts') || descr.includes('liberal arts')
    })
  }

  return arr
}

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
  const byDept =
    selectedDept && selectedDept !== '__ALL__'
      ? courses.filter(c => getDept(c.crse) === selectedDept)
      : courses

  let visible = filterCourses(byDept)

  switch (clickCountEnrollment) {
    case 1:
      visible = [...visible].sort(
        (a, b) => (a.enrolled ?? 0) - (b.enrolled ?? 0),
      )
      downIconEnrollment.style.color = '#000000ff'
      filterEnrollment.setAttribute(
        'aria-label',
        'Sort by Descending Enrollment',
      )
      break
    case 2:
      visible = [...visible].sort(
        (a, b) => (b.enrolled ?? 0) - (a.enrolled ?? 0),
      )
      upIconEnrollment.style.color = '#000000ff'
      downIconEnrollment.style.color = '#b9b9b9ff'
      filterEnrollment.setAttribute('aria-label', 'Default Enrollment order')
      break
    default:
      visible = [...visible]
      upIconEnrollment.style.color = '#b9b9b9ff'
      downIconEnrollment.style.color = '#b9b9b9ff'
      filterEnrollment.setAttribute(
        'aria-label',
        'Sort by Ascending Enrollment',
      )
      break
  }

  switch (clickCountCredit) {
    case 1:
      visible = [...visible].sort((a, b) => daysCount(a) - daysCount(b))
      downIconCredit.style.color = '#000000ff'
      filterCredit.setAttribute('aria-label', 'Sort by Credit Descending')
      break
    case 2:
      visible = [...visible].sort((a, b) => daysCount(b) - daysCount(a))
      upIconCredit.style.color = '#000000ff'
      downIconCredit.style.color = '#b9b9b9ff'
      filterCredit.setAttribute('aria-label', 'Default Credit order')
      break
    default:
      visible = [...visible]
      upIconCredit.style.color = '#b9b9b9ff'
      downIconCredit.style.color = '#b9b9b9ff'
      filterCredit.setAttribute('aria-label', 'Sort by Credit Ascending')
      break
  }

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
