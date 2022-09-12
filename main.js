import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

const sortByClassNumberEL = document.getElementById('sortByClassNumber')
sortByClassNumberEL.addEventListener('click', sortByClassNumber)
function sortByClassNumber() {
  console.log("sortByClassNumber")
  courses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}
const sortByClassSizeEL = document.getElementById('sortByClassSize')
sortByClassSizeEL.addEventListener('click', sortByClassSize)
function sortByClassSize() { 
  console.log("sortByClassSize")
  courses.sort((a, b) => b.ENROLLED - a.ENROLLED)
  const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}