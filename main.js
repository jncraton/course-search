import { courses } from './courses.js';

// Create set that stores departments first 4 characters and doesnt repeat
const departmentSet = new Set();

courses.forEach(course => {
  const department = course.CRSE.slice(0, 4);
  departmentSet.add(department);
});

// Populate dropdown menu
const departmentsDropdown = document.getElementById('departments');
departmentSet.forEach(department => {
  const option = document.createElement('option');
  option.value = department;
  option.textContent = `Department ${department}`;
  departmentsDropdown.appendChild(option);
});

const rows = courses.map(course => {
  return `<tr>
            <td>${course.CRSE} - ${course.DESCR}</td>
          </tr>`;
});

//Function updates table based on the department that was selected
function updateTable(selectedDepartment) {
  const filteredCourses = selectedDepartment
    ? courses.filter(course => {
        const department = course.CRSE.slice(0, 4);
        return department == selectedDepartment;
      })
    : courses;

  const rows = filteredCourses.map(course => {
    return `<tr>
              <td>${course.CRSE} - ${course.DESCR}</td>
            </tr>`;
  });

  document.querySelector('tbody').innerHTML = rows.join('');
}

departmentsDropdown.addEventListener('change', event => {
  const selectedDepartment = event.target.value;
  updateTable(selectedDepartment);
});

updateTable('');
document.querySelector('tbody').innerHTML = rows.join('');
const courseTableBody = document.querySelector('tbody')
const sortSelect = document.getElementById('sortSelect')

function renderCourses(courses, sortBy) {
  const rows = courses.map(course => {
    if (course.ENROLLING == 'Closed') {
      return `<tr>
      <td><s>${course.CRSE} - ${course.DESCR}</s></td>
    </tr>`
    } else {
      return `<tr>
      <td>${course.CRSE} - ${course.DESCR}</td>
    </tr>`
    }
  })

  courseTableBody.innerHTML = rows.join('')
}

// Initial render
renderCourses(courses, 'courseNumber')

// Event listener for sorting
sortSelect.addEventListener('change', () => {
  const sortBy = sortSelect.value

  if (sortBy === 'courseNumber') {
    courses.sort((a, b) => a.CRSE.localeCompare(b.CRSE))
  } else if (sortBy === 'enrolled') {
    courses.sort((a, b) => parseInt(b.ENROLLED) - parseInt(a.ENROLLED))
  } else {
    // Default sorting or invalid option
    courses.sort((a, b) => a.DESCR.localeCompare(b.DESCR))
  }

  renderCourses(courses, sortBy)
})
