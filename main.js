import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
            <td>${course.MAX_CREDIT}</td>
            <td>${course.ENROLLED}</td>

          </tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

const credSort = document.getElementById('credits')
credSort.onclick = () => {
  courses.sort((a, b) => b.MAX_CREDIT - a.MAX_CREDIT)
  const sortedRows = courses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
              <td>${course.MAX_CREDIT}</td>
              <td>${course.ENROLLED}</td>
            </tr>`
  })

  document.querySelector('tbody').innerHTML = sortedRows.join('')
}
