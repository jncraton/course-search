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

// Grab element for sorter
const selectSort = document.getElementById('selectSort')

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
selectSubjectElement.addEventListener('change', () => {updateTable('subject')})

// Populate start time filter
const selectStartTimeElement = document.getElementById('selectStartTime')
selectStartTimeElement.addEventListener('change', () => {updateTable('time')})

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
selectInstructionModeElement.addEventListener('change', () => {updateTable('instruction')})

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
specialConsentElement.addEventListener('change', () => {updateTable('consent')})

// Element table body
const coursesTableBody = document.getElementById('coursesTableBody')

function updateTable(element) {
  // Clear all existing rows
  coursesTableBody.innerHTML = ''
  const setSubject = selectSubjectElement.value
  const setTime = selectStartTimeElement.value
  const setInstrction = selectInstructionModeElement.value
  const setConsent = specialConsentElement.value
  const setSort = selectSort.value

  // Filter Courses
  const filteredCourses = courses.filter(course => {
    // No filter
    if(setSubject === 'All' && setTime === 'All' && setInstrction === 'All' && setConsent === 'All') { return courses } 
    // Single filter
    else if(setTime === 'All' && setInstrction === 'All' && setConsent === 'All') { return ( course.CRSE.slice(0,4) == setSubject ) } 
    else if(setSubject === 'All' && setInstrction === 'All' && setConsent === 'All') { return ( course.START_TIME == setTime ) } 
    else if(setSubject === 'All' && setTime === 'All' && setConsent === 'All') { return ( course.INSTRUCTION_MODE == setInstrction ) } 
    else if(setSubject === 'All' && setTime === 'All' && setInstrction === 'All') { return ( course.CONSENT == setConsent ) }
    // 2 filters
    else if(setSubject === 'All' && setTime === 'All') { return ( course.CONSENT == setConsent && course.INSTRUCTION_MODE == setInstrction ) }  
    else if(setSubject === 'All' && setInstrction === 'All') { return ( course.CONSENT == setConsent && course.START_TIME == setTime ) }  
    else if(setSubject === 'All' && setConsent === 'All') { return ( course.INSTRUCTION_MODE == setInstrction && course.START_TIME == setTime ) }  
    else if(setTime === 'All' && setInstrction === 'All') { return ( course.CRSE.slice(0,4) == setSubject && course.CONSENT == setConsent ) }  
    else if(setTime === 'All' && setConsent === 'All') { return ( course.CRSE.slice(0,4) == setSubject && course.INSTRUCTION_MODE == setInstrction ) } 
    else if(setInstrction === 'All' && setConsent === 'All') { return ( course.CRSE.slice(0,4) == setSubject && course.START_TIME == setTime ) }
    // 3 filters
    else if(setSubject === 'All') { return ( course.START_TIME == setTime && course.INSTRUCTION_MODE == setInstrction &&  course.CONSENT == setConsent ) }  
    else if(setTime === 'All') { return ( course.CRSE.slice(0,4) == setSubject && course.INSTRUCTION_MODE == setInstrction &&  course.CONSENT == setConsent ) }  
    else if(setInstrction === 'All') { return ( course.CRSE.slice(0,4) == setSubject && course.START_TIME == setTime &&  course.CONSENT == setConsent ) }  
    else if(setConsent === 'All') { return ( course.CRSE.slice(0,4) == setSubject && course.INSTRUCTION_MODE == setInstrction &&  course.START_TIME == setTime ) } 
    // All filters
    else { return ( course.CRSE.slice(0,4) == setSubject && course.START_TIME == setTime && course.INSTRUCTION_MODE == setInstrction && course.CONSENT == setConsent ) }    
  })

  if(!filteredCourses){
    filteredCourses = courses
  }

  // Add a row to the table for each course
  filteredCourses.forEach(course => {
    const row = document.createElement('tr')

    if (course.ENROLLING === 'Closed') row.classList.add('closed-course')
    columns.forEach(columnID => {
      const cell = document.createElement('td')
      /* TODO: Filter based on current dropdown values (Issue #85)
         The relevant element IDs are selectSubject, selectStartTime, and selectInstructionMode.
         The select element's value will be blank if the "All" option is selected.
         Otherwise, it the value will match the text displayed in the dropdown.
      */
     // Updates 'Consent' column to shorted field
      if (columnID === 'CONSENT') {
        if (course.CONSENT == 'No Special Consent Required')
          cell.innerText = 'None'
        else if (course.CONSENT === 'Instructor Consent Required')
          cell.innerText = 'Instructor'
        else if (course.CONSENT === 'Department Consent Required')
          cell.innerText = 'Department'
        else cell.innerText = course[columnID]
      } else cell.innerText = course[columnID]
      row.appendChild(cell)
    })

    coursesTableBody.appendChild(row)
  })
}

// Initial unfiltered table
updateTable('')