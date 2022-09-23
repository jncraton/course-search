import { courses } from './courses.js'

let filteredCourses = courses

//Accepts an array and returns every course with input included in DESCR
function searchByValue(courses, searchTerm) {
  return courses.filter(
    course =>
      course.DESCR.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.INSTR.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

//Accepts an array and the current order of the sort (ASC or DESC)
//Returns a sorted array by course number
function sortByCourseNumber(courses, currOrder) {
  if (currOrder == '1') {
    document.getElementById('cnumsortbutton-AU').value = '2'
    document.getElementById('cnumsortbutton-AU').innerHTML =
      '<i class="bi bi-sort-numeric-down"></i>'
    return courses.sort((a, b) => b.CRSE.localeCompare(a.CRSE))
  } else {
    document.getElementById('cnumsortbutton-AU').value = '1'
    document.getElementById('cnumsortbutton-AU').innerHTML =
      '<i class="bi bi-sort-numeric-up"></i>'
    return courses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  }
}

//Accepts an array and the current order of the sort (ASC or DESC)
//Returns a sorted array by course size
function sortByCourseSize(courses, currOrder) {
  if (currOrder == '1') {
    document.getElementById('enrollsortbutton-AU').value = '2'
    document.getElementById('enrollsortbutton-AU').innerHTML =
      '<i class="bi bi-sort-numeric-down"></i>'
    return courses.sort((a, b) => b.ENROLLED.localeCompare(a.ENROLLED))
  } else {
    document.getElementById('enrollsortbutton-AU').value = '1'
    document.getElementById('enrollsortbutton-AU').innerHTML =
      '<i class="bi bi-sort-numeric-up"></i>'
    return courses.sort((a, b) => a.ENROLLED.localeCompare(b.ENROLLED))
  }
}

//Populates the dropdown for departments search.
function populateDepts() {
  const depts = new Set()
  courses.map(course => {
    let dept = course.CRSE.substring(0, 4)
    depts.add(dept)
  })

  const list = Array.from(depts).map(dept => {
    return `<option value="${dept}">${dept}</option>`
  })

  list.unshift('<option value="">Choose a department</option>')
  document.getElementById('deptselect-AU').innerHTML = list.join('')
}

//Filters the list by departments, accepts an array and return an array
function filterByDept(courses, filter) {
  if (filter) {
    return courses.filter(course => {
      return course.CRSE.substring(0, 4) === filter
    })
  }
}

//filters courses by showing either online courses only or all courses depending on whether a box is checked
//accepts array of courses and boolean depending on checkbox state, returns course array
function filterByMode(courses) {
  return courses.filter(
    course =>
      course.INSTRUCTION_MODE === 'Online' ||
      course.INSTRUCTION_MODE === 'Blended:Mtg/Online'
  )
}

//filters courses by showing either open courses only or all courses
//accepts array of courses and boolean depending on checkbox state, returns course array
function filterByStatus(courses) {
  return courses.filter(course => course.ENROLLING === 'Open')
}

//Funtion that returns the courses that match a specific time from time input box
function filterByTime(courses, time) {
  if (time) {
    courses = courses.filter(course => {
      return course.START_TIME.includes(time)
    })
    return courses
  }
}

function populateLib() {
  const libA = new Set()
  courses.filter(course => {
    if (course.NEWLIB != ' ') {
      let lib = course.NEWLIB
      libA.add(lib)
    }
  })

  const lib_list = Array.from(libA).map(lib => {
    return `<option value="${lib}">${lib}</option>`
  })

  lib_list.unshift('<option value="">Choose a Liberal Arts Req</option>')
  document.getElementById('libselect-AU').innerHTML = lib_list.join('')
}

function filterByLib(courses, filter) {
  if (filter) {
    return courses.filter(course => {
      return course.NEWLIB === filter
    })
  }
}

//filter courses by calling each filter function
//then return the filtered courses
function filterCourses(courses) {
  let searchValue = document.getElementById('input-AU').value
  let searchTime = document.getElementById('timeinput-AU').value
  let searchOnline = document.getElementById('flexSwitchCheckDefault').checked
  let searchOpen = document.getElementById('flexSwitchCheckDefault1').checked
  let searchDept = document.getElementById('deptselect-AU').value
  let searchLib = document.getElementById('libselect-AU').value
  let sortCnum = document.getElementById('cnumsortbutton-AU').value
  let sortEnroll = document.getElementById('enrollsortbutton-AU').value
  if (searchValue != '') {
    courses = searchByValue(courses, searchValue)
  }
  if (searchTime != '') {
    courses = filterByTime(courses, searchTime)
  }
  if (searchOnline) {
    courses = filterByMode(courses)
  }
  if (searchOpen) {
    courses = filterByStatus(courses)
  }
  if (searchDept != '') {
    courses = filterByDept(courses, searchDept)
  }
  if (searchLib != '') {
    courses = filterByLib(courses, searchLib)
  }
  if (sortCnum == '1' || sortCnum == '2') {
    courses = sortByCourseNumber(courses, sortCnum)
  }
  if (sortEnroll == '1' || sortEnroll == '2') {
    courses = sortByCourseSize(courses, sortEnroll)
  }

  return courses
}

function renderCourses() {
  filteredCourses = filterCourses(courses)

  const rows = filteredCourses.map(course => {
    let onlineIco = ''
    let openIco = ''

    //use the appropriate icon for online or in-person classes
    if (course.INSTRUCTION_MODE === 'Face to Face') {
      onlineIco = '<i class="bi bi-person-fill" id="online-AU"></i>'
    } else {
      onlineIco = '<i class="bi bi-laptop" id="remote-AU"></i>'
    }

    //use the appropriate icon for open or closed classes
    if (course.ENROLLING === 'Open') {
      openIco = '<i class="bi bi-check-circle-fill" id="open-AU"></i>'
    } else {
      openIco = '<i class="bi bi-x-circle-fill" id="close-AU"></i>'
    }

    return `<tr><td>${course.CRSE}</td>
                <td>${course.DESCR}</td>
                <td>${course.INSTR}</td>
                <td>${course.DAYS}</td>
                <td>${course.START_TIME}</td>
                <td>${course.ENROLLED}</td>
                <td>${openIco}</td>
                <td>${onlineIco}</td></tr>`
  })

  document.querySelector('tbody').innerHTML = rows.join('')
}

function clear() {
  window.location.reload()
}

//Render all class information
document.getElementById('container-AU').addEventListener('input', e => {
  document.getElementById('cnumsortbutton-AU').value = '0'
  document.getElementById('enrollsortbutton-AU').value = '0'
  renderCourses()
})

document.getElementById('cnumsortbutton-AU').addEventListener('click', e => {
  if (document.getElementById('cnumsortbutton-AU').value == '0') {
    document.getElementById('cnumsortbutton-AU').value = '1'
  }
  if (document.getElementById('enrollsortbutton-AU').value != '0') {
    document.getElementById('enrollsortbutton-AU').value = '0'
    document.getElementById('enrollsortbutton-AU').innerHTML =
      '<i class="bi bi-sort-numeric-up"></i>'
  }
  renderCourses()
})

document.getElementById('enrollsortbutton-AU').addEventListener('click', e => {
  if (document.getElementById('enrollsortbutton-AU').value == '0') {
    document.getElementById('enrollsortbutton-AU').value = '1'
  }
  if (document.getElementById('cnumsortbutton-AU').value != '0') {
    document.getElementById('cnumsortbutton-AU').value = '0'
    document.getElementById('cnumsortbutton-AU').innerHTML =
      '<i class="bi bi-sort-numeric-up"></i>'
  }
  renderCourses()
})

document.getElementById('clearbtn-AU').addEventListener('click', e => {
  clear()
})

window.onload = () => {
  renderCourses()
}

populateDepts()
populateLib()
