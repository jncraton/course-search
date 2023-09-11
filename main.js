import { courses } from './courses.js'

const rows = courses.map(course => {
  return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
          </tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')

all.onclick = function filterAll(){
  const rows = courses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

online.onclick = function filterOnline() {
  const onlineCourses = courses.filter((course) => course.INSTRUCTION_MODE == "Online");
  const rows2 = onlineCourses.map((course) => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`;
  });
  document.querySelector('tbody').innerHTML = rows2.join('');
}

face.onclick = function filterFace(){
  const onlineCourses = courses.filter((course) => course.INSTRUCTION_MODE == "Face to Face");
  const rows = onlineCourses.map((course) => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`;
  });

  document.querySelector('tbody').innerHTML = rows.join('');
}

hybrid.onclick = function filterHybrid(){
  const onlineCourses = courses.filter((course) => course.INSTRUCTION_MODE == "Blended:Mtg/Online");
  const rows = onlineCourses.map((course) => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`;
  });
  document.querySelector('tbody').innerHTML = rows.join('');
}
