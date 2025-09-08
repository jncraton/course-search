import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')

// Prof.Craton given code (I changed it --> add new column)
courses.forEach(course => {
  const row = template.content.cloneNode(true)
  row.querySelectorAll('td')[0].textContent = `${course.crse}`
  row.querySelectorAll('td')[1].textContent = `${course.descr}`
  row.querySelectorAll('td')[2].textContent = `${course.enrolled}`
  tbody.append(row)
})

// Comperacent elements like a tree
function compareCourses(a, b) {
  return a.enrolled - b.enrolled
}

// Creating function that would be responsible for maxValue
// Creating the ...courses from courses and putting the course into sortenrolledmaxmin where we taken only enrolled and compare them
function maxValue() {
  const sortenrolledmaxmin = [...courses].sort(compareCourses)
  // Cleaning given element
  tbody.innerHTML = ''

  // Using Prof.Craton code but adding the const that we created
  sortenrolledmaxmin.forEach(course => {
    const row = template.content.cloneNode(true)
    row.querySelectorAll('td')[0].textContent = `${course.crse}`
    row.querySelectorAll('td')[1].textContent = `${course.descr}`
    row.querySelectorAll('td')[2].textContent = `${course.enrolled}`
    tbody.append(row)
  })
}

// Creating function that would be responsible for minValue
// Creating the ...courses from courses and putting the course into sortenrolledmaxmin where we taken only enrolled and compare them
function mincompareCourses(a, b) {
  return b.enrolled - a.enrolled
}

// Using Prof.Craton code but adding the const that we created
function minValue() {
  const sortenrolledmaxmin = [...courses].sort(mincompareCourses)
  // Cleaning given element
  tbody.innerHTML = ''

  sortenrolledmaxmin.forEach(course => {
    const row = template.content.cloneNode(true)
    row.querySelectorAll('td')[0].textContent = `${course.crse}`
    row.querySelectorAll('td')[1].textContent = `${course.descr}`
    row.querySelectorAll('td')[2].textContent = `${course.enrolled}`
    tbody.append(row)
  })
}

// Function when we are not using filter
function notactive() {
  // Cleaning given element
  tbody.innerHTML = ''
  courses.forEach(course => {
    const row = template.content.cloneNode(true)
    row.querySelectorAll('td')[0].textContent = `${course.crse}`
    row.querySelectorAll('td')[1].textContent = `${course.descr}`
    row.querySelectorAll('td')[2].textContent = `${course.enrolled}`
    tbody.append(row)
  })
}

document.getElementById('min-max').addEventListener('click', maxValue)
document.getElementById('max-min').addEventListener('click', minValue)
document.getElementById('notactive').addEventListener('click', notactive)
