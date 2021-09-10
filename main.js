import { courses } from './courses.js'
let closedClass = "";
const rows = courses.map((course) => {
  if (course.ENROLLING === 'Open')
  {
    closedClass = "openClass";
  }
  else
  {
    closedClass = "closedClass";
  }
  return `<tr class = ${closedClass}><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})


document.querySelector('tbody').innerHTML = rows.join('')
