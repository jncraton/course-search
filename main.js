import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')
const template = document.querySelector('#filterDepartment')

const getDept = crse => crse.split("-", 1)[0];
const uniqueDept = [...new Set(getDept)];
console.log(uniqueDept);

function renderTable() {

  tbody.innerHTML = ''

courses.forEach(course => {
  const row = template.content.cloneNode(true)
  row.querySelectorAll('td')[0].textContent = `${course.crse.split("-", 1)}`
  row.querySelectorAll('td')[1].textContent = `${course.crse.split("-", 2).slice(1)}`
  row.querySelectorAll('td')[2].textContent = `${course.descr}`
  tbody.append(row)
})
}
renderTable()
filterBox.addEventListener('change', renderTable)