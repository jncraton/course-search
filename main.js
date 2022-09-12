import { courses } from './courses.js'

const depts = new Set(["Choose a department"]);
courses.map(course => {
  let dept = course.CRSE.substring(0,4);
  depts.add(dept);
})

const list = Array.from(depts).map(dept => {
  return `<option value=${dept}>${dept}</option>`
})

document.querySelector('[name="dept"]').innerHTML = list.join('')


function renderCourses() {
  
  let filterDept = document.querySelector('[name="dept"]').textContent
  
  if (filterDept.length() > 4){
    const rows = courses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} </td></tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
  document.querySelector('[name="dept"]').addEventListener('change',renderCourses)

  }
  else {
    filteredCourses = courses.filter(course => {
    return course.CRSE.substring(0,4) === filterDept
  })
  const rows = filteredCourses.map(course => {
    return `<tr><td>${course.CRSE} - ${course.DESCR} </td></tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
  document.querySelector('[name="dept"]').addEventListener('change',renderCourses)

  }
}
renderCourses();