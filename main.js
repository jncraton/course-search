import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
