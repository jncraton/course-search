import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')
const filterBox = document.querySelector('#filterDepartment')

const getDept = crse => crse.split('-', 1)[0]

function populateDeptFilter() {
  const depts = Array.from(new Set(courses.map(c => getDept(c.crse)))).sort()

  filterBox.innerHTML = ''

  const allOpt = document.createElement('option')
  allOpt.value = '__ALL__'
  allOpt.textContent = 'ALL DEPARTMENTS'
  filterBox.append(allOpt)

  depts.forEach(d => {
    const opt = document.createElement('option')
    opt.value = d
    opt.textContent = d
    filterBox.append(opt)
  })
}

function renderTable() {

  tbody.innerHTML = ''

  const selectedDept = filterBox.value
  let visible;
  if (selectedDept && selectedDept !== '__ALL__') {
    visible = courses.filter(c => getDept(c.crse) === selectedDept);
  } else {
    visible = courses;
  }

  visible.forEach(course => {
    const row = template.content.cloneNode(true)
    const tds = row.querySelectorAll('td')

    tds[0].textContent = getDept(course.crse)
    tds[1].textContent = course.crse.split('-').slice(1).join('-')
    tds[2].textContent = course.descr

    tbody.append(row)
  })
}

populateDeptFilter()

renderTable()
filterBox.addEventListener('change', renderTable)