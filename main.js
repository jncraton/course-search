import { courses } from './courses.js'

let filteredCourses = courses
let online = false

// Add event listener to online only button
const onlineButtonEL = document.getElementById('online-filter')
onlineButtonEL.addEventListener('click', showOnlineOnly, false)

//filters the course list by whether or not the course is online
//activated when the show online courses only button is clicked
function showOnlineOnly() {
  if (online) {
    filteredCourses = courses
    online = false
  } else {
    filteredCourses = courses.filter(function (value, index) {
      return value.INSTRUCTION_MODE == 'Online'
    })
    online = true
  }
  let rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.INSTRUCTION_MODE}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR} </td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

//sorts the table alphabetically and by class number when the button is clicked
const sortByClassNumberEL = document.getElementById('sortByClassNumber')
sortByClassNumberEL.addEventListener('click', sortByClassNumber)
function sortByClassNumber() {
  console.log('sortByClassNumber')
  filteredCourses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  const rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

//sorts the table by class size when the button is clicked
const sortByClassSizeEL = document.getElementById('sortByClassSize')
sortByClassSizeEL.addEventListener('click', sortByClassSize)
function sortByClassSize() {
  console.log('sortByClassSize')
  filteredCourses.sort((a, b) => b.ENROLLED - a.ENROLLED)
  const rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}
