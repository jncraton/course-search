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

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
