import { courses } from './courses.js'

//Accepts an array and returns every course with input included in DESCR
function searchDescr(courses, searchTerm) {
  return courses.filter(course => course.DESCR.toLowerCase().includes(searchTerm.toLowerCase()))
}

//Accepts an array and returns every course with input included in INSTR
function searchInstr(courses, searchTerm) {
  return courses.filter(course => course.INSTR.toLowerCase().includes(searchTerm.toLowerCase()))
}

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')