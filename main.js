import { courses } from './courses.js'

function reloadCourseTable(filteredCourses) {
  const rows = filteredCourses.map(course => {
    console.log(course.START_TIME, "", course.START_TIME === "")
    
    if (!(document.querySelector('#pre-req').checked) || (document.querySelector('#pre-req').checked && course.CONSENT != 'No Special Consent Required')) {
      let formattedConsent = course.CONSENT
      switch(formattedConsent) {
        case "No Special Consent Required":
          formattedConsent = "None"
          break
        case "Department Consent Required":
          formattedConsent = "Department"
          break
        case "Instructor Consent Required":
          formattedConsent = "Instructor"
          break
      }
      return `<tr>
                <td>${course.DESCR}</td>
                <td>${course.CRSE.substring(0, 4)}</td>
                <td>${course.START_TIME === "" ? "See Instructor" : course.START_TIME}</td>
                <td>${course.INSTRUCTION_MODE}</td>
                <td>${formattedConsent}</td>
                <td>${course.MAX_CREDIT}</td>
                <td>${course.ENROLLED}</td>
                <td>${course.ENROLLING}</td>
              </tr>`
    } else {
      return ""
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

function applyFilters() {
  let filteredCourses = courses
  // Run your filter here
  // Example: filteredCourses = filterDepartment(filteredCourses)
  filteredCourses = filterDepartment(filteredCourses)

  console.log('Running filter')
  reloadCourseTable(filteredCourses)
}

// Add event listeners to automatically filter courses
document.querySelector('#filter-form').addEventListener('change', () => {
  applyFilters()
  // return false
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
