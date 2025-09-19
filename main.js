import { courses } from './courses.js'

// html elements
const $ = sel => document.querySelector(sel)
const selectDay = document.querySelector('#selected-days')
const filterOnline = document.querySelector('#filter-online')
const filterCredit = document.querySelector('#credit-button')
const filterEnrollment = document.querySelector('#enrollments-button')
const inputElements = document.querySelectorAll('select, input')

const sortNextLabels = ['Sort Ascending', 'Sort Descending', 'Sort Default']
let sortCol = ''
let sortState = 0

function renderTable() {
  $('tbody').innerHTML = '' // clear rows first

  let visible = courses.filter(
    c =>
      (!$('#filter-dept').value || c.dept === $('#filter-dept').value) &&
      (!$('#filter-consent').checked || c.consent === 'Consent Required') &&
      (!selectDay.value || (c.days || '').includes(selectDay.value)) &&
      (!filterOnline.checked || c['instruction mode'].includes('Online')),
  )

  if (sortState > 0) {
    visible.sort(
      (a, b) => (a[sortCol] - b[sortCol]) * (sortState == 1 ? 1 : -1),
    )
  }

  // Go through the current array of courses and display them (assumes things are filtered and sorted)
  visible.forEach(course => {
    const row = $('#course-row').content.cloneNode(true)
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

    $('tbody').append(row)
  })
}

// Enrollment filter button event list.
filterEnrollment.addEventListener('click', () => {
  if (sortCol == 'enrolled') {
    sortState = (sortState + 1) % 3
  } else {
    sortState = 1
    sortCol = 'enrolled'
  }

  filterEnrollment.setAttribute('aria-label', sortNextLabels[sortState])
  filterCredit.setAttribute('aria-label', sortNextLabels[0])
  renderTable()
})

// Credit filter button event list.
filterCredit.addEventListener('click', () => {
  if (sortCol == 'hours') {
    sortState = (sortState + 1) % 3
  } else {
    sortState = 1
    sortCol = 'hours'
  }

  filterEnrollment.setAttribute('aria-label', sortNextLabels[0])
  filterCredit.setAttribute('aria-label', sortNextLabels[sortState])
  renderTable()
})

function init() {
  courses.forEach(crse => {
    crse.dept = crse.crse.split('-', 1)[0]
    crse.hours = Math.max(1, crse.days.trim().length)
  })

  // add option for each department
  const depts = Array.from(new Set(courses.map(c => c.dept))).sort()
  depts.forEach(dept => {
    const opt = document.createElement('option')
    opt.value = opt.textContent = dept
    $('#filter-dept').append(opt)
  })

  inputElements.forEach(el => el.addEventListener('change', renderTable))

  renderTable()
}
init()
