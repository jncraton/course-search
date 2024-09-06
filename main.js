import { courses } from './courses.js'

// However the filter is being applied, we'll assume "hide_special_consent = false; and is true when applied"
const hide_special_consent = true;

const rows = courses.map(course => {
  if (hide_special_consent == true) {
  	if (course.CONSENT != 'No Special Consent Required') {
  	  return}
  	else {
      return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
          </tr>`
          }
    }
})

document.querySelector('tbody').innerHTML = rows.join('')
