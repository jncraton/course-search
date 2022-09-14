import { courses } from './courses.js'

//Author: @Jacob Spires
document
  .getElementById('search-button')
  .addEventListener('click', getCoursesFromTime)
//getCoursesFromTime lets the user search for a course based on start time
function getCoursesFromTime() {
  let input = document.getElementById('timeSearch').value
  input = input.toUpperCase() //accounts for lower case input
  const rows = courses.map(course => {
    //if input is in START_TIME, return the start time, course name, and course description
    if (course.START_TIME.includes(input)) {
      return `<tr><td>${course.START_TIME} - ${course.CRSE} - ${course.DESCR}</td></tr>`
    }
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}
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
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

document
  .querySelector('[name="dept"]')
  .addEventListener('change', renderCourses)
renderCourses()

//sorts the table alphabetically and by class number when the button is clicked
const sortByClassNumberEL = document.getElementById('sortByClassNumber')
sortByClassNumberEL.addEventListener('click', sortByClassNumber)
function sortByClassNumber() {
  console.log('sortByClassNumber')
  courses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

//sorts the table by class size when the button is clicked
const sortByClassSizeEL = document.getElementById('sortByClassSize')
sortByClassSizeEL.addEventListener('click', sortByClassSize)
function sortByClassSize() {
  console.log('sortByClassSize')
  courses.sort((a, b) => b.ENROLLED - a.ENROLLED)
  const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}