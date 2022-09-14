import { courses } from './courses.js'

//Author: Michael Carroll
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
  return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

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
