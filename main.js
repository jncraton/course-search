import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')
const filterBox = document.querySelector('#filterConsent')

function renderTable() {
  tbody.innerHTML = '' // clear rows first

  var selectday = document.getElementById('selecteddays')

  courses.forEach(course => {
    // If the checkbox is checked, only show "Consent Needed" courses
    if (filterBox.checked && course.consent !== 'Consent Required') return

    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    tds[0].textContent = `${course.crse} - ${course.descr} - ${course.days}`
    tds[1].textContent = course.consent

    tbody.append(row)
  })

  selectday.addEventListener('change', function () {
    tbody.innerHTML = ''
    courses
      .filter(course => course.days.includes(selectday.value))
      .forEach(course => {
        const row = template.content.cloneNode(true)
        row.querySelector('td').textContent =
          `${course.crse} - ${course.descr} - ${course.days}`
        tbody.append(row)
      })
  })
}

// Initial render
renderTable()

// Re-render whenever checkbox state changes
filterBox.addEventListener('change', renderTable)
