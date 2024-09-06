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

function filterOptions() {
  const departmentCode = document.querySelector("#dept-filter").value
  console.log(departmentCode)
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