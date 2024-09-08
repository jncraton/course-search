import { courses } from './courses.js'

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

const button = document.querySelector('button');
button.addEventListener('click', onButtonClick);
