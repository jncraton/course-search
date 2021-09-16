import { courses } from './courses.js'

const classNumberBox = document.getElementById('classNumberFilter')
const classSizeButton = document.getElementById('filterBySize')
const liberalArtBox = document.getElementById('liberalart')
const intensiveBox = document.getElementById('intensive')

const instructorSearch = document.getElementById('instructor')
const descriptionSearch = document.getElementById('description')

const chairBox = document.getElementById('chairClassFilter')

let closedClass = ''
let hideRequirement = false
let courseNumberFilter = ''
let liberalArt = ''
let liberalIntensive = ''
let classSize = ''
// variable
let chair = ''

let instructorBox = ''
let descriptionBox = ''

// Renders the table based on the above variables
function render () {
  let sortedCourses = [...courses]

  if (classSize) {
    sortedCourses.sort((a, b) => b.ENROLLED - a.ENROLLED)
    if (classSize === 'low') sortedCourses.reverse()
  }

  if (courseNumberFilter) {
    sortedCourses = sortedCourses.filter((course) => course.CRSE.includes(courseNumberFilter.toUpperCase()))
  }
  if (liberalArt) {
    sortedCourses = sortedCourses.filter((course) => course.NEWLIB.includes(liberalArt.toUpperCase()))
  }

  if (liberalIntensive) {
    sortedCourses = sortedCourses.filter((course) =>
      course.NEWLIBINTENSIVES.includes(liberalIntensive.toUpperCase())
    )
  }
  if (chair) {
    sortedCourses = sortedCourses.filter((course) => course.CRSE.includes(chair.toUpperCase()))
  }

  if (instructorBox) {
    sortedCourses = sortedCourses.filter((course) => course.CRSE.includes(instructorBox.toUpperCase()))
  }
  if (descriptionBox) {
    sortedCourses = sortedCourses.filter((course) => course.CRSE.includes(descriptionBox.toUpperCase()))
  }

  const rows = sortedCourses.map((course) => {
    // Checks if the hide consent checkbox is checked, and if so, returns and does not render add other filters HERE
    if (course.ENROLLING === 'Open') {
      closedClass = 'openClass'
    } else {
      closedClass = 'closedClass'
    }
    if (hideRequirement && course.CONSENT === 'Instructor Consent Required') {
      return ''
    } else {
      return `<tr class = ${closedClass}><td>${course.CRSE}</td><td>${course.DESCR}</td><td>${course.INSTR}</td><td>${course.DAYS}</td><td>${course.ENROLLED}</td></tr>`
    }
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

/*
 * Event listener on checkbox that hides courses requiring special consent
 */
document.getElementById('hide-courses-requiring-consent').addEventListener('click', () => {
  hideRequirement = !hideRequirement
  render()
})

classSizeButton.addEventListener('click', () => {
  if (classSizeButton.innerText.includes('∧')) {
    classSizeButton.innerText = classSizeButton.innerText.substr(0, classSizeButton.innerText.length - 1) + '∨'
    classSize = 'low'
  } else if (classSizeButton.innerText.includes('∨')) {
    classSizeButton.innerText = classSizeButton.innerText.substr(0, classSizeButton.innerText.length - 1)
    classSize = ''
  } else {
    classSizeButton.innerText += ' ∧'
    classSize = 'high'
  }
  render()
})

classNumberBox.addEventListener('keyup', () => {
  courseNumberFilter = classNumberBox.value
  render()
})

liberalArtBox.addEventListener('keyup', () => {
  liberalArt = liberalArtBox.value
  render()
})

intensiveBox.addEventListener('keyup', () => {
  liberalIntensive = intensiveBox.value
  render()
})
chairBox.addEventListener('change', () => {
  chair = chairBox.value
  render()
})
render()

instructorSearch.addEventListener('keyup', () => {
  instructorBox = instructorSearch.value
  render()
})
descriptionSearch.addEventListener('keyup', () => {
  descriptionBox = descriptionSearch.value
  render()
})