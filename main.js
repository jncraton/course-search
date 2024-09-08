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
  courses.sort((a,b) => a.ENROLLED - b.ENROLLED);
  console.log(courses);
  alert('Button clicked!');
}

const button = document.querySelector('button');
button.addEventListener('click', onButtonClick);
