import { courses } from './courses.js'

let filteredCourses = courses
let online = false

// Add event listener to online only button
const onlineButtonEL = document.getElementById('online-filter')
onlineButtonEL.addEventListener('click', showOnlineOnly, false)

//filters the course list by whether or not the course is online
//activated when the show online courses only button is clicked
function showOnlineOnly() {
  if(online){
    online=false
  }else{online=true}
  renderCourses();
}

function resetFilters(){
  
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

  if (filterDept) {
    filteredCourses = courses.filter(course => {
      return course.CRSE.substring(0, 4) === filterDept
    })
  }
  if(online){
    filteredCourses = filteredCourses.filter(function (value, index) {
      return value.INSTRUCTION_MODE == 'Online'
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
  filteredCourses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  const rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
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

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR} </td></tr>`
})