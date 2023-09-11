import { courses } from './courses.js'

const courseTableBody = document.querySelector('tbody')
const sortSelect = document.getElementById('sortSelect')

function renderCourses(courses, sortBy) {
  const rows = courses.map(course => {
    if (course.ENROLLING == 'Closed') {
      return `<tr>
      <td><s>${course.CRSE} - ${course.DESCR}</s></td>
    </tr>`
    } else {
      return `<tr>
      <td>${course.CRSE} - ${course.DESCR}</td>
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

all.onclick = function filterAll() {
  const rows = courses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

online.onclick = function filterOnline() {
  const onlineCourses = courses.filter(
    course => course.INSTRUCTION_MODE == 'Online',
  )
  const rows2 = onlineCourses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })
  document.querySelector('tbody').innerHTML = rows2.join('')
}

face.onclick = function filterFace() {
  const onlineCourses = courses.filter(
    course => course.INSTRUCTION_MODE == 'Face to Face',
  )
  const rows = onlineCourses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

hybrid.onclick = function filterHybrid() {
  const onlineCourses = courses.filter(
    course => course.INSTRUCTION_MODE == 'Blended:Mtg/Online',
  )
  const rows = onlineCourses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}
