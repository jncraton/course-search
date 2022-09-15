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

// Add event listener to reset button
const resetButtonEL = document.getElementById('reset-filters')
resetButtonEL.addEventListener('click', resetFilters, false)

function resetFilters(){
  online = false
  const fullRows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} </td></tr>`
  })
  document.querySelector('tbody').innerHTML = fullRows.join('')
}

//event listener for search button
document.getElementById('string-search').addEventListener('click', getCourses)
//Get courses lets the user search for a course by CRSE, DESCR, or INSTR
function getCourses() {
  let num // to store course number
  let desc // to store course description
  let inst // to store course instructor
  let time
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
    time = course.START_TIME.toUpperCase() //Jacob Spires Change
    //if input is in CRSE, DESCR, or INSTR, return course
    if (
      num.includes(input) ||
      desc.includes(input) ||
      inst.includes(input) ||
      time.includes(input)
    ) {
      //build table
      return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.INSTR} - ${course.START_TIME}</td></tr>`
    }
  })
  //join rows
  document.querySelector('tbody').innerHTML = rows.join('')
  //clear input box
  document.getElementById('course-search-box').value = ''
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
  filteredCourses = courses
  if (filterDept) {
    filteredCourses = filteredCourses.filter(course => {
      return course.CRSE.substring(0, 4) === filterDept
    })
  }
  if(online){
    filteredCourses = filteredCourses.filter(value => {
      return value.INSTRUCTION_MODE == 'Online' || value.INSTRUCTION_MODE == 'Blended:Mtg/Online'
    })
  }
  const rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.INSTRUCTION_MODE}</td></tr>`
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

const select_new_lib_requirements = courses.filter(course => {
  if (course.NEWLIB != ' ') {
    let lib = course.NEWLIB
    libR.add(lib)
    return true
  }
})

const lib_list = Array.from(libR).map(lib => {
  return `<option value="${lib}">${lib}</option>`
})

lib_list.unshift(
  `<option value="">Select A New Liberal Arts Requirement</option>`
)

document.querySelector('[name="lib"]').innerHTML = lib_list.join('')

function sortByLibRequirement() {
  let libSorted = document.querySelector('[name="lib"]').value

  let libCourses = courses
  if (libSorted) {
    libCourses = courses.filter(course => {
      return course.NEWLIB === libSorted
    })
  }

  const rows = libCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED} - ${course.NEWLIB}</td></tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

document
  .querySelector('[name="lib"]')
  .addEventListener('change', sortByLibRequirement)
sortByLibRequirement()

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR} </td></tr>`
})
document.querySelector('tbody').innerHTML = rows.join('')

const libR = new Set()