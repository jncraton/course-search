import { courses } from './courses.js'

function reloadCourseTable(filteredCourses) {
  const rows = filteredCourses.map(course => {
    const rowClass = course.ENROLLING === 'Closed' ? 'CLOSED' : ''

    if (
      !document.querySelector('#pre-req').checked ||
      (document.querySelector('#pre-req').checked &&
        course.CONSENT === 'No Special Consent Required')
    ) {
      // Format consent/prereq requirements
      let formattedConsent = course.CONSENT
      switch (formattedConsent) {
        case 'No Special Consent Required':
          formattedConsent = 'None'
          break
        case 'Department Consent Required':
          formattedConsent = 'Department'
          break
        case 'Instructor Consent Required':
          formattedConsent = 'Instructor'
          break
      }

      // Format instruction mode
      let formattedInstructionMode = course.INSTRUCTION_MODE
      switch (formattedInstructionMode) {
        case 'Face to Face':
          formattedInstructionMode = 'In-Person'
          break
        case 'Blended:Mtg/Online':
          formattedInstructionMode = 'Hybrid (See Instructor)'
          break
      }

      return `<tr>
                <td>${course.DESCR}</td>
                <td>${course.CRSE.substring(0, 4)}</td>
                <td>${
                  course.START_TIME === ''
                    ? 'See Instructor'
                    : course.START_TIME
                }</td>
                <td>${formattedInstructionMode}</td>
                <td>${formattedConsent}</td>
                <td>${course.MAX_CREDIT}</td>
                <td>${course.ENROLLED}</td>
                <td>${rowClass}</td>
              </tr>`
    } else {
      return ''
    }
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}
reloadCourseTable(courses)

const enrollmentSort = document.getElementById('enrollment')

let enrollmentSortCount = 2
enrollmentSort.onclick = () => {
  if (enrollmentSortCount % 2 == 0) {
    courses.sort((a, b) => b.ENROLLED - a.ENROLLED)
    enrollmentSortCount++
    reloadCourseTable(courses)
  } else {
    courses.sort((a, b) => a.ENROLLED - b.ENROLLED)
    enrollmentSortCount++
    reloadCourseTable(courses)
  }
}

const courseNameSort = document.getElementById('course-header-btn')

courseNameSort.onclick = () => {
  courses.sort((a, b) => {
    if (a.CRSE < b.CRSE) {
      return -1
    }
    if (a.CRSE > b.CRSE) {
      return 1
    }
    return 0
  })
  reloadCourseTable(courses)
}

const credSort = document.getElementById('credits')
let credSortCount = 2
credSort.onclick = () => {
  if (credSortCount % 2 == 0) {
    courses.sort((a, b) => b.MAX_CREDIT - a.MAX_CREDIT)
    reloadCourseTable(courses)
    credSortCount++
  } else {
    courses.sort((a, b) => a.MAX_CREDIT - b.MAX_CREDIT)
    reloadCourseTable(courses)
    credSortCount++
  }
}

function applyFilters() {
  let filteredCourses = courses
  // Run your filter here
  // Example: filteredCourses = filterDepartment(filteredCourses)
  filteredCourses = filterCourseByStartTime(filteredCourses)
  filteredCourses = filterDepartment(filteredCourses)
  filteredCourses = OnlineOnly(filteredCourses)

  reloadCourseTable(filteredCourses)
}

// Add event listeners to automatically filter courses
document.querySelector('#filter-form').addEventListener('change', () => {
  applyFilters()
  // return false
})

function OnlineOnly(courses) {
  console.log('Online Filter Running')
  if (document.getElementById('online-only').checked == true) {
    return courses.filter(checkInstruction)
  } else {
    return courses
  }
}

function checkInstruction(course) {
  return course.INSTRUCTION_MODE != 'Face to Face'
}

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

function filterCourseByStartTime(courses) {
  const filterTime = document.getElementById('startTimes').value

  if (filterTime === 'No Specific Time') {
    return courses
  } else {
    return courses.filter(course => {
      return course.START_TIME === filterTime
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
