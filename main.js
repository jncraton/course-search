import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')

var selectday = document.getElementById('selecteddays')

courses.filter(course => course.days.includes(selectday.value)).forEach(course => {
  const row = template.content.cloneNode(true)
  row.querySelector('td').textContent = `${course.crse} - ${course.descr} - ${course.days}`
  tbody.append(row)
})

selectday.addEventListener('change', function() {
  tbody.innerHTML = ''
  courses.filter(course => course.days.includes(selectday.value)).forEach(course => {
    const row = template.content.cloneNode(true)
    row.querySelector('td').textContent = `${course.crse} - ${course.descr} - ${course.days}`
    tbody.append(row)
})
})