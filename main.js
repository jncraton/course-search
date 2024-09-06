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

function filterOptions(event) {
  const departmentCode = document.querySelector("#dept-filter").value
  console.log(departmentCode)
  if (departmentCode === "") {
    filteredCourses = courses
  }
  else {
    filteredCourses = courses.filter(course => {
      console.log(course.CRSE.substring(0, 4), departmentCode, course.CRSE.substring(0, 4) === departmentCode, )
      return course.CRSE.substring(0, 4) === departmentCode
    })
  }
  reloadTable()
}

document.querySelector("#filter-submit").addEventListener("click", filterOptions)