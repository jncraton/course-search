import { courses } from './courses.js'

const tbody = document.querySelector('tbody')
const template = document.querySelector('#courserow')

courses.forEach(course => {
  const row = template.content.cloneNode(true)
  row.querySelector('td').textContent = `${course.crse} - ${course.descr}`
  tbody.append(row)
})

//on click of online selection print online classes only
button.addEventListener("click",()=> {
  tbody.innerHTML = ''
  courses.forEach(course => {
    if((course.crse[10]=="0")&& course.crse[11]=="E"){
      const row = template.content.cloneNode(true)
      row.querySelector('td').textContent = `${course.crse} - ${course.descr}`
      tbody.append(row)
    }
  })
  });
 
