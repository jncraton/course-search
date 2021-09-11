import { courses } from './courses.js'

const rows = courses.map((course) => {
  return `<tr><td>${course.CRSE}</td><td>${course.DESCR}</td><td>${course.INSTR}</td><td>${course.DAYS}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
