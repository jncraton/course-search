import { courses } from './courses.js'

const rows = courses.map(course => {
  if(course.ENROLLING == "Closed"){
    return `<tr>
    <td><s>${course.CRSE} - ${course.DESCR}</s></td>
  </tr>`
  }
  else{
    return `<tr>
    <td>${course.CRSE} - ${course.DESCR}</td>
  </tr>`
  }
})

document.querySelector('tbody').innerHTML = rows.join('')
