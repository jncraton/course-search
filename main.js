import { courses } from './courses.js'

const columns = [
  'CRSE',
  'DESCR',
  'INSTR',
  'DAYS',
  'START_TIME',
  'CONSENT',
  'INSTRUCTION_MODE',
  'ENROLLED',
]

// Create a Set that stores the subject code, which is the first four characters of the course caption
const subjectSet = new Set()
courses.forEach(course => {
  subjectSet.add(course.CRSE.slice(0, 4))
})
// Populate subject filter
const selectSubjectElement = document.getElementById('selectSubject')
Array.from(subjectSet)
  .sort()
  .forEach(value => {
    const option = document.createElement('option')
    option.value = value
    option.textContent = value
    selectSubjectElement.appendChild(option)
  })
selectSubjectElement.addEventListener('change', updateTable)

// Create a Set that stores the start times
const startTimeSet = new Set()
courses.forEach(course => {
  startTimeSet.add(course.START_TIME)
})
// Populate start time filter
const selectStartTimeElement = document.getElementById('selectStartTime')
Array.from(startTimeSet)
  .sort()
  .forEach(value => {
    const option = document.createElement('option')
    option.value = value
    option.textContent = value
    selectStartTimeElement.appendChild(option)
  })
selectStartTimeElement.addEventListener('change', updateTable)

// Create a Set that stores the instruction modes
const instructionModeSet = new Set()
courses.forEach(course => {
  instructionModeSet.add(course.INSTRUCTION_MODE)
})
// Populate instruction mode filter
const selectInstructionModeElement = document.getElementById(
  'selectInstructionMode',
)
Array.from(instructionModeSet)
  .sort()
  .forEach(value => {
    const option = document.createElement('option')
    option.value = value
    option.textContent = value
    selectInstructionModeElement.appendChild(option)
  })
selectInstructionModeElement.addEventListener('change', updateTable)

// Create a Set that stores the special consent options
const specialConsentSet = new Set()
courses.forEach(course => {
  specialConsentSet.add(course.CONSENT)
})
// Populate special consent filter
const specialConsentElement = document.getElementById('selectConsent')
Array.from(specialConsentSet)
  .sort()
  .forEach(value => {
    const option = document.createElement('option')
    option.value = value
    option.textContent = value
    specialConsentElement.appendChild(option)
  })
specialConsentElement.addEventListener('change', updateTable)

// Event listener for sorting dropdown
selectSort.addEventListener('change', updateTable)

const coursesTableBody = document.getElementById('coursesTableBody')

// Update the updateTable function to accept an optional searchQuery parameter
function updateTable(searchQuery = '') {
  // Clear all existing rows
  coursesTableBody.innerHTML = '';

  // Filter courses based on the search query and other filters
  const filteredCourses = courses.filter(course => {
    // Check if the course name (DESCR) contains the search query
   return  course.CRSE.toLowerCase().includes(searchQuery.toLowerCase()) || 
   course.DESCR.toLowerCase().includes(searchQuery.toLowerCase()) || 
   course.INSTR.toLowerCase().includes(searchQuery.toLowerCase())
  });


  // Add a row to the table for each filtered course
  filteredCourses.forEach(course => {
    const row = document.createElement('tr');
    if (course.ENROLLING === 'Closed') row.classList.add('closed-course');
    columns.forEach(columnID => {
      const cell = document.createElement('td');
      // Handle the CONSENT column separately as in your existing code
      if (columnID === 'CONSENT') {
        if (course.CONSENT === 'No Special Consent Required')
          cell.innerText = 'None';
        else if (course.CONSENT === 'Instructor Consent Required')
          cell.innerText = 'Instructor';
        else if (course.CONSENT === 'Department Consent Required')
          cell.innerText = 'Department';
        else cell.innerText = course[columnID];
      } else {
        cell.innerText = course[columnID];
      }
      row.appendChild(cell);
    });
    coursesTableBody.appendChild(row);
  });
}

// Event listener for input changes in the search bar
searchInput.setAttribute('size',searchInput.getAttribute('placeholder').length);
searchInput.addEventListener('input', () => {
  const searchQuery = searchInput.value;
  updateTable(searchQuery);
});

// Initial table population (without search)
updateTable();

