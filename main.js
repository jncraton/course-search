import { courses } from './courses.js'

//Accepts an array and returns every course with input included in DESCR
function searchDescr(courses, searchTerm) {
  return courses.filter(course =>
    course.DESCR.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

//Accepts an array and returns every course with input included in INSTR
function searchInstr(courses, searchTerm) {
  return courses.filter(course =>
    course.INSTR.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

//Accepts an array and the current order of the sort (ASC or DESC)
//Returns a sorted array by course number
function sortByCourseNumber(courses, currOrder) {
  if (currOrder == 'ASC') {
    return courses.sort((a, b) => b.CRSE.localeCompare(a.CRSE))
  } else {
    return courses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  }
}

//Accepts an array and the current order of the sort (ASC or DESC)
//Returns a sorted array by course size
function sortByCourseSize(courses, currOrder) {
  if (currOrder == 'ASC') {
    return courses.sort((a, b) => a.SIZE - b.SIZE)
  } else {
    return courses.sort((a, b) => b.SIZE - a.SIZE)
  }
}

//Populates the dropdown for departments search.
function populateDepts() {
  const depts = new Set()
  courses.map(course => {
    let dept = course.CRSE.substring(0, 4)
    depts.add(dept)
  })

  const list = Array.from(depts).map(dept => {
    return dept
  })

  list.unshift('Choose a department')
  return list
}

//Filters the list by departments, accepts an array and return an array
function filterByDept(courses, filter) {
  if (filter) {
    return courses.filter(course => {
      return course.CRSE.substring(0, 4) === filter
    })
  }
}

//filters courses by showing either online courses only or all courses depending on whether a box is checked
//accepts array of courses and boolean depending on checkbox state, returns course array
function filterByMode(courses, checked) {
  if (checked) {
    courses = courses.filter(course => {
      return (
        course.INSTRUCTION_MODE === 'Online' ||
        course.INSTRUCTION_MODE === 'Blended:Mtg/Online'
      )
    })
  }
}

//filters courses by showing either open courses only or all courses
//accepts array of courses and boolean depending on checkbox state, returns course array
function filterByStatus(courses, checked) {
  if (checked) {
    return courses.filter(course => {
      return course.ENROLLING === 'Open'
    })
  }
  else{
    return courses
  }
}

//Funtion that returns the courses that match a specific time from time input box
function filterByTime(courses, time) {
  if (time) {
    courses = courses.filter(course => {
      return course.START_TIME.includes(time)
    })
    return courses
  }
}

function populateLib() {
  const libA = new Set()
  const libPop = courses.filter(course => {
    if (course.NEWLIB != ' ') {
      let lib = course.NEWLIB
      libA.add(lib)
    }
  })

  const lib_list = Array.from(libA).map(lib => {
    return lib
  })

  lib_list.unshift('Select liberal arts requirements program')
  return lib_list
}

function filterByLib(courses, filter) {
  if (filter) {
    return courses.filter(course => {
      return course.NEWLIB === filter
    })
  }
}

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
