import { courses } from './courses.js'

//event listener for search button
document.getElementById('string-search').addEventListener('click', getCourses)
//Get courses lets the user search for a course by CRSE, DESCR, or INSTR
function getCourses() {
  let num // to store course number
  let desc // to store course description
  let inst // to store course instructor
  //get value from box
  let input = document.getElementById('course-search-box').value
  //convert to uppercase
  input = input.toUpperCase()
  //loop through courses
  const rows = courses.map(course => {
    // convert to uppercase
    num = course.CRSE.toUpperCase()
    desc = course.DESCR.toUpperCase()
    inst = course.INSTR.toUpperCase()
    //if input is in CRSE, DESCR, or INSTR, return course
    if (num.includes(input) || desc.includes(input) || inst.includes(input)) {
      //build table
      return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.INSTR}</td></tr>`
    }
  })
  //join rows
  document.querySelector('tbody').innerHTML = rows.join('')
  //clear input box
  document.getElementById('course-search-box').value = ''
}

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED} </td></tr>`
})

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

//Shows what courses are not enrolling students
const toggleAvailabilityEL = document.getElementById('toggleAvailability')
toggleAvailabilityEL.addEventListener('click', toggleAvailability)
function toggleAvailability() {
  console.log('toggleAvailabity')
  const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLING}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}