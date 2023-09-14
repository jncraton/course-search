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

function updateTable() {
  // Clear all existing rows
  coursesTableBody.innerHTML = ''

  // Add a row to the table for each course
  courses.forEach(course => {
    const row = document.createElement('tr')
    if (course.ENROLLING == 'Closed') row.classList.add('closed-course')
    columns.forEach(columnID => {
      const cell = document.createElement('td')
      /* TODO: Filter based on current dropdown values (Issue #85)
         The relevant element IDs are selectSubject, selectStartTime, and selectInstructionMode.
         The select element's value will be blank if the "All" option is selected.
         Otherwise, it the value will match the text displayed in the dropdown.
      */
      if (columnID == 'CONSENT') {
        if (course.CONSENT == 'No Special Consent Required')
          cell.innerText = 'None'
        else if (course.CONSENT == 'Instructor Consent Required')
          cell.innerText = 'Instructor'
        else if (course.CONSENT == 'Department Consent Required')
          cell.innerText = 'Department'
        else cell.innerText = course[columnID]
      } else cell.innerText = course[columnID]
      row.appendChild(cell)
    })
    coursesTableBody.appendChild(row)
  })
}

// Initial unfiltered table
updateTable(courses, 'courseNumber')
