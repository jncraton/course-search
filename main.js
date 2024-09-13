import { courses } from './courses.js'


const rows = courses.map(course => {
  if (document.getElementById('pre-req').checked == true) {
    if (course.CONSENT != 'No Special Consent Required') {
      return
    } else {
      if (document.getElementById('online-only').checked == true) {
        if(course.INSTRUCTION_MODE == 'Face to Face') {
          return
        } else {
          return `<tr>
                <td>${course.CRSE} - ${course.DESCR} - ${course.CONSENT} - ${course.INSTRUCTION_MODE}</td>
              </tr>`
        }
      } else {
          return `<tr>
                <td>${course.CRSE} - ${course.DESCR} - ${course.CONSENT} - ${course.INSTRUCTION_MODE}</td>
              </tr>`
      }
    }
  } else {
    if (document.getElementById('online-only').checked == true) {
        if(course.INSTRUCTION_MODE == 'Face to Face') {
          return
        } else {
          return `<tr>
                <td>${course.CRSE} - ${course.DESCR} - ${course.CONSENT} - ${course.INSTRUCTION_MODE}</td>
              </tr>`
        }
      } else {
        return `<tr>
                  <td>${course.CRSE} - ${course.DESCR} - ${course.CONSENT} - ${course.INSTRUCTION_MODE}</td>
                </tr>`
    }
  }
})

document.querySelector('tbody').innerHTML = rows.join('')
