import { courses } from './courses.js'

const rows = courses.map(course => {
  let RowEnroll = ''
  if (course.ENROLLING === 'Closed') {
    RowEnroll = 'closed-enrollment';
  }
  if (document.getElementById('pre-req' == true)) {
    if (course.CONSENT != 'No Special Consent Required') {
      return
    } else {
      return `<tr class="${RowEnroll}">
            <td>${course.CRSE} - ${course.DESCR}</td>
          </tr>`
    }
  } else {
    return `<tr class="${RowEnroll}">
          <td>${course.CRSE} - ${course.DESCR}</td>
        </tr>`
  }
})

document.querySelector('tbody').innerHTML = rows.join('')
