import { courses } from './courses.js'

//Author: Michael Carroll
//event listener for search button
document.getElementById('string-search').addEventListener('click', getCourses)
//Get courses lets the user search for a course by CRSE, DESCR, or INSTR
function getCourses() {
  //get value from box
  let input = document.getElementById('course-search-box').value
  //loop through courses
  const rows = courses.map(course => {
    //if input is in CRSE, DESCR, or INSTR, return course
    if (course.CRSE.includes(input) || course.DESCR.includes(input) || course.INSTR.includes(input)) {
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
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')