import { courses } from './courses.js'

//Populate Dropdown
const depts = new Set()
courses.map(course => {
  let dept = course.CRSE.substring(0, 4)
  depts.add(dept)
})

const list = Array.from(depts).map(dept => {
  return `<option value="${dept}">${dept}</option>`
})

list.unshift(`<option value="">Choose a department</option>`)

document.querySelector('[name="dept"]').innerHTML = list.join('')

//Populate Courses
function renderCourses() {
  let filterDept = document.querySelector('[name="dept"]').value

  let filteredCourses = courses
  if (filterDept) {
    filteredCourses = courses.filter(course => {
      return course.CRSE.substring(0, 4) === filterDept
    })
  }
  const rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} </td></tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

document
  .querySelector('[name="dept"]')
  .addEventListener('change', renderCourses)
renderCourses()
