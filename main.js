import { courses } from './courses.js'

let filteredCourses = courses

function reloadTable() {
  const rows = filteredCourses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

reloadTable()

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
  document.querySelector('#dept-filter').innerHTML = deptOptionsHTML.join('')
}
reloadDepartmentOptions()

function filterOptions() {
  const departmentCode = document.querySelector("#dept-filter").value

  if (departmentCode === "") {
    filteredCourses = courses
  }
  else {
    filteredCourses = courses.filter(course => {
      return course.CRSE.substring(0, 4) === departmentCode.toUpperCase()
    })
  }
  reloadTable()
}

document.querySelector("#filter-submit").addEventListener("click", filterOptions)