import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')
const filterBox = document.querySelector('#filterConsent')
const filterOnline = document.querySelector('#filterOnline')

courses.forEach(course => {
  const row = template.content.cloneNode(true)
  row.querySelector('td').textContent = `${course.crse} - ${course.descr}`
  tbody.append(row)
})

//on click of online selection print online classes only
filterOnline.addEventListener('click', () => {
  tbody.innerHTML = ''
  courses.forEach(course => {
    if (course.crse[10] == '0' && course.crse[11] == 'E') {
      const row = template.content.cloneNode(true)
      row.querySelector('td').textContent = `${course.crse} - ${course.descr}`
      tbody.append(row)
    }
  })
})

function renderTable() {
  tbody.innerHTML = '' // clear rows first

  courses.forEach(course => {
    // If the checkbox is checked, only show "Consent Needed" courses
    if (filterBox.checked && course.consent !== 'Consent Required') return

    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    tds[0].textContent = `${course.crse} - ${course.descr}`
    tds[1].textContent = course.consent

    tbody.append(row)
  })
}

// Initial render
renderTable()

// Re-render whenever checkbox state changes
filterBox.addEventListener('change', renderTable)
