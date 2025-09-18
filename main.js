import { courses } from './courses.js'

// html elements
const tbody = document.querySelector('tbody')
const template = document.querySelector('#course-row')
const filterConsent = document.querySelector('#filter-consent')
const selectDay = document.querySelector('#selected-days')
const filterOnline = document.querySelector('#filter-online')
const filterBox = document.querySelector('#filterDepartment')
const liberalArtsCheckbox = document.querySelector('#liberal-arts-filter')

const inputElements = document.querySelectorAll('select, input')

let sortMode = 'not-active'

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
  let visible
  if (selectedDept && selectedDept !== '__ALL__') {
    visible = courses.filter(c => getDept(c.crse) === selectedDept)
  } else {
    visible = courses
  }

  currentCourses = visible
  filterCourses()

  switch (sortMode) {
    case 'min-max-enrollment':
      currentCourses = [...currentCourses].sort(
        (a, b) => a.enrolled - b.enrolled,
      )
      break
    case 'max-min-enrollment':
      currentCourses = [...currentCourses].sort(
        (a, b) => b.enrolled - a.enrolled,
      )
      break
    case 'min-max-credit-hours':
      currentCourses = [...currentCourses].sort(
        (a, b) => daysCount(a) - daysCount(b),
      )
      break
    case 'max-min-credit-hours':
      currentCourses = [...currentCourses].sort(
        (a, b) => daysCount(b) - daysCount(a),
      )
      break
    default:
    // no sorting
  }

  // Go through the current array of courses and display them (assumes things are filtered and sorted)
  currentCourses.forEach(course => {
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

function setSortAndRender(mode) {
  sortMode = mode
  renderTable()
}

// Add event listeners to all the select dropdowns and input checkboxes
inputElements.forEach(element => {
  element.addEventListener('change', renderTable)
})

// Initial render
populateDeptFilter()
renderTable()

// Auto render for sorting
document
  .getElementById('min-max-enrollment')
  .addEventListener('click', () => setSortAndRender('min-max-enrollment'))
document
  .getElementById('max-min-enrollment')
  .addEventListener('click', () => setSortAndRender('max-min-enrollment'))
document
  .getElementById('not-active')
  .addEventListener('click', () => setSortAndRender('not-active'))
document
  .getElementById('min-max-credit-hours')
  .addEventListener('click', () => setSortAndRender('min-max-credit-hours'))
document
  .getElementById('max-min-credit-hours')
  .addEventListener('click', () => setSortAndRender('max-min-credit-hours'))
