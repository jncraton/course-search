import { courses } from './courses.js'

function reloadCourseTable(filteredCourses) {
  const rows = courses.map(filteredCourses => {
    return `<tr>
              <td>${filteredCourses.CRSE} - ${filteredCourses.DESCR}</td>
            </tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}
reloadCourseTable()


document.querySelector('#filter-btn').addEventListener("click", () => {
  let filteredCourses = courses
  // Run your filter here
  // Example: filteredCourses = filterDepartment(filteredCourses)

  console.log("Running filter")
  reloadCourseTable()
})