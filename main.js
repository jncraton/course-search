import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr>
            <td>${course.crse} - ${course.descr}</td>
          </tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
