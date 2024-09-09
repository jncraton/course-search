import { courses } from './courses.js'

function createTable(tableContent){
  const rows = tableContent.map(row => {
    return `<tr>
              <td>${row.CRSE} - ${row.DESCR}</td>
            </tr>`
  });
  
  document.querySelector('tbody').innerHTML = rows.join('');
}
window.onload = createTable(courses);

function filterCoursesByStartTime() {
  const filterTime = document.getElementById("startTimes").value;
  
  const filteredCourses = courses.filter(course => {
    return course.START_TIME >= filterTime
  }
  );
  createTable(filteredCourses);
}

document.getElementById("startTimes").addEventListener('change',filterCoursesByStartTime);




