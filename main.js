import { courses } from './courses.js'

function reloadCourseTable(filteredCourses) {
  const rows = filteredCourses.map(course => {
    if (document.querySelector('#pre-req').checked) {
      if (course.CONSENT != 'No Special Consent Required') {
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


const credSort = document.getElementById('credits')
let credSortCount = 2
credSort.onclick = () => {
  if(credSortCount % 2 == 0){
    courses.sort((a, b) => a.MAX_CREDIT - b.MAX_CREDIT)
    reloadCourseTable(courses)
    credSortCount++
  } else {
    courses.sort((a, b) => b.MAX_CREDIT - a.MAX_CREDIT)
    reloadCourseTable(courses)
    credSortCount++
  }
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
