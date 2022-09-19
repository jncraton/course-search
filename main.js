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

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
