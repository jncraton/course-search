import { courses } from './courses.js'

function loadTable(){
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
  loadTable();
  alert('Button clicked!');
}

const button = document.querySelector('button');
button.addEventListener('click', onButtonClick);
