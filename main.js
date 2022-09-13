import { courses } from './courses.js'

const rows = courses.map(course => {
<<<<<<< HEAD
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
=======
  return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
>>>>>>> 9952ce6e4fa7ef4c64fa720588f5b16ab710b618
})

document.querySelector('tbody').innerHTML = rows.join('')

//sorts the table alphabetically and by class number when the button is clicked
const sortByClassNumberEL = document.getElementById('sortByClassNumber')
sortByClassNumberEL.addEventListener('click', sortByClassNumber)
function sortByClassNumber() {
  console.log('sortByClassNumber')
  courses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

//sorts the table by class size when the button is clicked
const sortByClassSizeEL = document.getElementById('sortByClassSize')
sortByClassSizeEL.addEventListener('click', sortByClassSize)
function sortByClassSize() {
  console.log('sortByClassSize')
  courses.sort((a, b) => b.ENROLLED - a.ENROLLED)
  const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.ENROLLED}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}
