import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
            <td>${course.MAX_CREDIT}</td>
            <td>${course.ENROLLED}</td>
          </tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

const enrollmentSort = document.getElementById('enrollment')
enrollmentSort.onclick = () => {
  courses.sort((b, a) => b.ENROLLED - a.ENROLLED)
  const enrollmentSortedRows = courses.map(course => {
    return `<tr>
        <td>${course.CRSE} - ${course.DESCR}</td>
        <td>${course.MAX_CREDIT}</td>
        <td>${course.ENROLLED}</td>
      </tr>`
  })
  document.querySelector('tbody').innerHTML = enrollmentSortedRows.join('')
}
