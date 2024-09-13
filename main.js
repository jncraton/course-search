import { courses } from './courses.js'

function reloadCourseTable(filteredCourses) {
  const rows = filteredCourses.map(course => {
    if (document.querySelector('#pre-req').checked) {
      if (course.CONSENT != 'No Special Consent Required') {
        console.log('Rejected course ', course.CRSE)
        return
      } else {
        return `<tr>
                <td>${course.CRSE} - ${course.DESCR}</td>
                <td>${course.MAX_CREDIT}</td>
                <td>${course.ENROLLED}</td>
              </tr>`
      }
    } else {
      return `<tr>
          <td>${course.CRSE} - ${course.DESCR}</td>
          <td>${course.MAX_CREDIT}</td>
          <td>${course.ENROLLED}</td>
        </tr>`
    }
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}
reloadCourseTable(courses)

const enrollmentSort = document.getElementById('enrollment')
enrollmentSort.onclick = () => {
  courses.sort((b, a) => b.ENROLLED - a.ENROLLED)
  reloadCourseTable(courses)
}

document.querySelector('#filter-btn').addEventListener('click', () => {
  let filteredCourses = courses
  // Run your filter here
  // Example: filteredCourses = filterDepartment(filteredCourses)

  console.log('Running filter')
  reloadCourseTable(filteredCourses)
})
