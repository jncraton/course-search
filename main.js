import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
          </tr>`
})

function reloadTable(){
  const rows = courses.map(course => {
    return `<tr>
        <td>${course.CRSE} - ${course.DESCR}</td>
        <td>${course.ENROLLED}</td>
      </tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('');
}

function onButtonClick() {
  courses.sort((b,a) => b.ENROLLED - a.ENROLLED);
  reloadTable();
}

const enrollmentButton = document.querySelector('enrollment');
enrollmentButton.addEventListener('click', onButtonClick);
