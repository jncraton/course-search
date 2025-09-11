import { courses } from './courses.js'

// html elements
const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')
const filterBox = document.querySelector('#filterDepartment')

// get course code to return just department
const getDept = crse => crse.split('-', 1)[0]

// get unique department codes
function populateDeptFilter() {
  const depts = Array.from(new Set(courses.map(c => getDept(c.crse)))).sort()

  filterBox.innerHTML = ''

  // Add all department option
  const allOpt = document.createElement('option')
  allOpt.value = '__ALL__'
  allOpt.textContent = 'ALL DEPARTMENTS'
  filterBox.append(allOpt)

  // add option for each department
  depts.forEach(d => {
    const opt = document.createElement('option')
    opt.value = d
    opt.textContent = d
    filterBox.append(opt)
  })
}

function renderTable() {

  tbody.innerHTML = ''

  // show courses based on filter
  const selectedDept = filterBox.value
  let visible;
  if (selectedDept && selectedDept !== '__ALL__') {
    visible = courses.filter(c => getDept(c.crse) === selectedDept);
  } else {
    visible = courses;
  }

  // create rows for visible course
  visible.forEach(course => {
    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    // add cell data
    tds[0].textContent = getDept(course.crse)
    tds[1].textContent = course.crse.split('-').slice(1).join('-')
    tds[2].textContent = course.descr

    tbody.append(row)
  })
}

populateDeptFilter()

renderTable()
filterBox.addEventListener('change', renderTable)