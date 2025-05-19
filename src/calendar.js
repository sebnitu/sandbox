const calendarBody = document.getElementById("calendar-body");
const monthYear = document.getElementById("calendar-month-year");
const calendarValueStore = document.getElementById("calendar-value-store");

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let onDateChange = null;

const monthNames = [
  "January", 
  "February", 
  "March", 
  "April", 
  "May", 
  "June",
  "July", 
  "August", 
  "September", 
  "October", 
  "November", 
  "December"
];

export function buildCalendar(month, year) {
  // Remove the contents of the existing rendered calendar
  calendarBody.innerHTML = "";

  // Update the month/year text
  monthYear.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let prevMonth = month - 1;
  let nextMonth = month + 1;
  let prevYear = year;
  let nextYear = year;

  if (month - 1 < 0) {
    prevMonth = 11;
    prevYear--;
  }

  if (month + 1 > 11) {
    nextMonth = 0;
    nextYear++;
  }

  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  const daysInNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();

  let date = 1;
  let dateNext = 1;

  for (let i = 0; i < 6; i++) {
    // Create table row
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      // Create table cell
      let cell = document.createElement("td");
      // Create form element
      const formattedValue = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      const radioId = `date-${formattedValue}`;

      if (i === 0 && j < firstDay) {
        // Previous months cell
        cell.classList.add("calendar__unavailable");
        cell.innerHTML = `
          <span class="calendar__label">
            <span>${daysInPrevMonth - firstDay + 1 + j}</span>
          </span>
        `;
      } else if (date > daysInMonth) {
        // Next months cell
        cell.classList.add("calendar__unavailable");
        cell.innerHTML = `
          <span class="calendar__label">
            <span>${dateNext}</span>
          </span>
        `;
        dateNext++;
      } else {
        // This months cell

        cell.innerHTML = `
          <input
            type="radio"
            name="calendar-date"
            class="calendar__input"
            id="${radioId}"
            value="${formattedValue}"
            aria-label="${monthNames[month]} ${date}, ${year}"
          />
          <label class="calendar__label" for="${radioId}">
            <span class="sr-only">Select ${formattedValue}</span>
            <span>${date}</span>
          </label>
        `;

        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-label", `${monthNames[month]} ${date}, ${year}`);
        
        // Highlight today
        const isToday =
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();

        if (isToday) {
          cell.classList.add("calendar__today");
          cell.setAttribute("aria-current", "date");
        }

        // Make weekends unavailable
        if (j === 0 || j === 6) {
          // cell.classList.add("calendar__unavailable");
        }

        date++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);

    if (date > daysInMonth) break;
  }

  // If a calendar value has been stored, select it on the calendar
  if (calendarValueStore.value) {
    // Check if this value exists in the current month options
    const selectedDateRadio = document.getElementById(`date-${calendarValueStore.value}`);
    if (selectedDateRadio) {
      selectedDateRadio.checked = true;
    }
  }

  // Add event listener for onChange function
  const radios = calendarBody.querySelectorAll('input[type="radio"][name="calendar-date"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      // Update the calendar value input
      calendarValueStore.value = radio.value;

      // Maybe run the onDateChange callback
      if (onDateChange && radio.checked) {
        onDateChange(radio.value); // value is in "YYYY-MM-DD" format
      }
    });
  });
}

export function onChange(callback) {
  onDateChange = callback;
}

export function value() {
  return calendarValueStore.value;
}

export function setMonth(num) {
  // Add the provided number to the current month
  currentMonth += num;

  // Set the month to 11 if our result is less than 0
  // Also update the year accordingly
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }

  // Set the month to 0 if our result is greater than 11 
  // Also update the year accordingly
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }

  // Build the calendar
  buildCalendar(currentMonth, currentYear);
};
