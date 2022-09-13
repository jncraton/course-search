import { courses } from './courses.js'

//Author: @Jacob Spires
document.getElementById('search-button').addEventListener('click', getCoursesFromTime)
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
const rows = courses.map(course => {
  return `<tr><td>${course.START_TIME} - ${course.CRSE} - ${course.DESCR}</td></tr>`
})
document.querySelector('tbody').innerHTML = rows.join('')
