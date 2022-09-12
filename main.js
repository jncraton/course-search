import { courses } from './courses.js'

function showOnlineOnly(){
  courses.forEach(course => {
    if(course.INSTRUCTION_MODE != "Online"){
    }
  });
  
}

const rows = courses.map(course => {
  return `<tr><td>${course.CRSE} - ${course.DESCR}</td></tr>`
})

document.querySelector('tbody').innerHTML = rows.join('')
