import { courses } from './courses.js'

const courseTableBody = document.querySelector('tbody')
const sortSelect = document.getElementById('sortSelect')
const sortTime = document.getElementById('sortTime')

function renderCourses(courses, sortBy) {
  const rows = courses.map(course => {
    if (course.ENROLLING == 'Closed') {
      return `<tr>
      <td><s>${course.CRSE} - ${course.DESCR} - ${course.START_TIME}</s></td>
    </tr>`
    } else {
      return `<tr>
      <td>${course.CRSE} - ${course.DESCR} - ${course.START_TIME}</td>
    </tr>`
    }
  })

  courseTableBody.innerHTML = rows.join('')
}

// Initial render
renderCourses(courses, 'courseNumber')

// Event listener for sorting
sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value

  if (sortBy === 'courseNumber') {
    courses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  } else if (sortBy === 'enrolled') {
    courses.sort((a, b) => parseInt(b.ENROLLED) - parseInt(a.ENROLLED))
  } else {
    // Default sorting or invalid option
    courses.sort((a, b) => a.DESCR.localeCompare(b.DESCR))
  }

  renderCourses(courses, sortBy)
})

// Filters courses based on selected Time
function updateTable(selectedTime) {
  const setTime = selectedTime
    ? courses.filter(course => {
        const time = course.START_TIME
        return time == selectedTime
      })
    : courses

  const rows = setTime.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR} - ${course.START_TIME}</td>
            </tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

// Event listener for time
sortTime.addEventListener('change', event => {
  const setTime = event.target.value
  if (setTime == 'All') {
    updateTable('')
  } else {
    updateTable(setTime)
  }
})
