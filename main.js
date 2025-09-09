import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')

courses.sort((a, b) => a.credits - b.credits)

courses.forEach(course => {
  const row = template.content.cloneNode(true)
  row.querySelector('td').textContent = `${course.crse} - ${course.descr} (${course.credits} cr)`
  tbody.append(row)
})