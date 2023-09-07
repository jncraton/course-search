import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
          </tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

function filterAll(){
  const rows = courses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

function filterOnline() {
  const onlineCourses = courses.filter((course) => course.INSTRUCTION_MODE == "Online");
  const rows2 = onlineCourses.map((course) => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`;
  });
  document.querySelector('tbody').innerHTML = rows2.join('');
}

function filterFace(){
  const onlineCourses = courses.filter((course) => course.INSTRUCTION_MODE == "Face to Face");
  const rows = onlineCourses.map((course) => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`;
  });

  document.querySelector('tbody').innerHTML = rows.join('');
}

function filterHybrid(){
  const onlineCourses = courses.filter((course) => course.INSTRUCTION_MODE == "Blended:Mtg/Online");
  const rows = onlineCourses.map((course) => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`;
  });
  document.querySelector('tbody').innerHTML = rows.join('');
}
