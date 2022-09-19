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
}

//Filters the list by departments, accepts an array and return an array
function filterByDept(courses, filter) {
  if (filter) {
    courses = courses.filter(course => {
      return course.CRSE.substring(0, 4) === filter
    })
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

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
