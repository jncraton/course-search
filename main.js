import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')
const filterBtn = document.querySelector('#filterConsent')

// 0 = Show all base case, 1 = consent needed, 2 = no consent needed
let filterState = 0

function renderTable(filterState) {
  tbody.innerHTML = '' // clear existing rows.

  courses.forEach(course => {
    if (filterState === 1 && course.consent === 'No Consent Required') return
    if (filterState === 2 && course.consent !== 'No Consent Required') return

    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    tds[0].textContent = `${course.crse} - ${course.descr}`
    tds[1].textContent = course.consent

    tbody.append(row)
  })
}

// Initial render
renderTable(filterState)

// One of the worst button cyclers in the history of man
filterBtn.addEventListener('click', () => {
  filterState = (filterState + 1) % 2
  renderTable(filterState)
})
