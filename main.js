import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')
const filterBox = document.querySelector('#filterConsent')
const liberalArtsCheckbox = document.getElementById("liberalArtsFilter");

function renderTable() {
  tbody.innerHTML = '' // clear rows first

  courses.forEach(course => {
    // If the checkbox is checked, only show "Consent Needed" courses
    if (filterBox.checked && course.consent !== 'Consent Required') return

    // Filter: Liberal Arts in course name/description
    if (liberalArtsCheckbox.checked &&
      !(course.descr.includes("Liberal Arts") || (course.title && course.title.includes("Liberal Arts")))) {
    return
    }

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
liberalArtsCheckbox.addEventListener('change', renderTable)
