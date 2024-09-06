import { courses } from './courses.js'

const rows = courses.map(course => {
  //make closed courses highlighted a different color
  if (course.STATUS == 'Closed') {
    document. body. style. backgroundColor = 'red';
  }
  return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
          </tr>`
})



document.querySelector('tbody').innerHTML = rows.join('')
