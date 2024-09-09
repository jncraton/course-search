import { courses } from './courses.js'

// Ethan: filteredCourses: the courses to display 
let filteredCourses = courses

// Ethan: put code for creating tables in its own function so we can reload tables. 
function reloadTable() {
  const rows = filteredCourses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

reloadTable()

// Ethan: load department options and automatically create the selectbox options
function reloadDepartmentOptions() {
  const deptOptions = []
  
  const deptOptionsHTML = courses.map(course => {
    const dept = course.CRSE.substring(0, 4)

    if (!deptOptions.includes(dept)) {

      deptOptions.push(dept)

      return `<option>${dept}</option>`

    } else {
      return ""
    }
  })

  document.querySelector('#dept-filter').innerHTML = "<option>NONE</option>" + deptOptionsHTML.join('')
}
reloadDepartmentOptions()

// Ethan: Filter courses by department
function filterDeptOptions() {
  const departmentCode = document.querySelector("#dept-filter").value

  if (departmentCode === "" || departmentCode === "NONE") {
    filteredCourses = courses
  }
  else {
    filteredCourses = courses.filter(course => {
      return course.CRSE.substring(0, 4) === departmentCode.toUpperCase()
    })
  }
  reloadTable()
}

document.querySelector("#filter-submit").addEventListener("click", filterDeptOptions)