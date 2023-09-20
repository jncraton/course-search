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

// 0 is decending 1 is accending
let order = 0
let currentSortColumn = null

const tableHeaders = document.querySelectorAll('thead th');
tableHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const columnID = header.id;
    order = columnID === currentSortColumn ? (order === 0 ? 1 : 0) : 1;
    currentSortColumn = columnID;
    updateTable(columnID, order);
  });
});

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

// Update table rows given the search parameter
function updateTable(colId, colOrder) {
  // Clear all existing rows
 // coursesTableBody.innerHTML = ''

  // Filter courses based on the search query and other filters
  const searchQuery = searchInput.value
  const filteredCourses = courses.filter(course => {
    // Check if the course name (DESCR) contains the search query
    return (
      course.CRSE.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.DESCR.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.INSTR.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  if (colId && colOrder != null) {
    filteredCourses = filteredCourses.sort((a, b) => {
      const valueA = a[colId];
      const valueB = b[colId];

      // Handle sorting for numeric values
      if (!isNaN(valueA) && !isNaN(valueB)) {
        return (colOrder === 0 ? valueB - valueA : valueA - valueB);
      }

      // Handle sorting for non-numeric values (alphabetical)
      return (colOrder === 0 ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB));
    });
  }
  coursesTableBody.innerHTML = '';
  // Add a row to the table for each filtered course
  filteredCourses.forEach(course => {
    const row = document.createElement('tr')
    if (course.ENROLLING === 'Closed') row.classList.add('closed-course')
    columns.forEach(columnID => {
      const cell = document.createElement('td')
      // Handle the CONSENT column separately as in your existing code
      if (columnID === 'CONSENT') {
        if (course.CONSENT === 'No Special Consent Required')
          cell.innerText = 'None'
        else if (course.CONSENT === 'Instructor Consent Required')
          cell.innerText = 'Instructor'
        else if (course.CONSENT === 'Department Consent Required')
          cell.innerText = 'Department'
        else cell.innerText = course[columnID]
      } else {
        cell.innerText = course[columnID]
      }
      row.appendChild(cell)
    })
    coursesTableBody.appendChild(row)
  })
   // If sorting is requested, apply sorting here
  if (colId && colOrder != null) {
    columnSort(colId, colOrder, filteredCourses);
  }
}

function columnSort(colId, colOrder, data) {
  if (data) {
    // Sorting based on the provided data
    data.sort((a, b) => {
      const valueA = a[colId];
      const valueB = b[colId];

      // Handle sorting for numeric values
      if (!isNaN(valueA) && !isNaN(valueB)) {
        return colOrder === 0 ? valueB - valueA : valueA - valueB;
      }

      // Handle sorting for non-numeric values (alphabetical)
      return colOrder === 0 ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
    });
  }

  // Update the table with the sorted data
  updateTable();
}



// Event listener for input changes in the search bar
searchInput.setAttribute('size', searchInput.getAttribute('placeholder').length)
searchInput.addEventListener('input', updateTable)

// Initial unfiltered table
updateTable()