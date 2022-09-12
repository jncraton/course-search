import { courses } from './courses.js'

let filteredCourses = courses;
let online = false;

function showOnlineOnly(){
  if(online){
    filteredCourses = courses;
    online = false;
  }
  else{
     filteredCourses = courses.filter(function(value,index){
      return value.INSTRUCTION_MODE == "Online";
  })
  online = true;
  }
  let rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.INSTRUCTION_MODE}</td></tr>`
  })
  document.querySelector('tbody').innerHTML = rows.join('')
}

// Add event listener to table
const el = document.getElementById("online-filter");
el.addEventListener("click", showOnlineOnly, false);

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR} - ${course.INSTRUCTION_MODE}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
