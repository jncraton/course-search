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
              </tr>`
      }
    } else {
      return `<tr>
          <td>${course.CRSE} - ${course.DESCR}</td>
        </tr>`
    }
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}
reloadCourseTable(courses)

document.querySelector('#filter-btn').addEventListener('click', () => {
  let filteredCourses = courses
  // Run your filter here
  // Example: filteredCourses = filterDepartment(filteredCourses)
  filteredCourses = filterDepartment(filteredCourses)

  console.log('Running filter')
  reloadCourseTable(filteredCourses)
})

function filterDepartment(courses) {
  // Set our department choice options
  const departmentCode = document.querySelector('#dept-filter').value

  if (departmentCode === '' || departmentCode === 'NONE') {
    return courses
  } else {
    return courses.filter(course => {
      return course.CRSE.substring(0, 4) === departmentCode.toUpperCase()
    })
  }
}

// Ethan: load department options and automatically create the selectbox options
function reloadDepartmentOptions() {
  const deptOptions = []

  const deptOptionsHTML = courses.map(course => {
    const dept = course.CRSE.substring(0, 4)

    if (!deptOptions.includes(dept)) {
      deptOptions.push(dept)

      return `<option>${dept}</option>`
    } else {
      return ''
    }
  })

  document.querySelector('#dept-filter').innerHTML =
    '<option>NONE</option>' + deptOptionsHTML.join('')
}
reloadDepartmentOptions()
