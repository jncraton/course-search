import { courses } from './courses.js'

// 'rows' needs to be mutable
let rows = courses.map((course) => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

/*
 * Event listener on checkbox that hides courses requiring special consent
*/
document.getElementById('hide-courses-requiring-consent').addEventListener('click', () => {
  // Re-renders table when checkbox is checked, excluding rows that have a required consent
  if (document.getElementById('hide-courses-requiring-consent').checked) {
    rows = courses.map((course) => {
      if (course.CONSENT !== 'Instructor Consent Required') {
        return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
      }
    })
  } else {
    // Renders table normally
    rows = courses.map((course) => {
      return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
    })
  }

  document.querySelector('tbody').innerHTML = rows.join('')
});
