const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('calendar-month-year');

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

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
      if (i === 0 && j < firstDay) {
        // Previous months cell
        cell.textContent = daysInPrevMonth - firstDay + 1 + j;
        cell.classList.add("calendar__unavailable");
      } else if (date > daysInMonth) {
        // Next months cell
        cell.textContent = dateNext;
        cell.classList.add("calendar__unavailable");
        dateNext++;
      } else {
        // This months cell
        const isToday =
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();

        cell.textContent = date;
        cell.tabIndex = 0;
        cell.setAttribute("role", "gridcell");
        cell.setAttribute("aria-label", `${monthNames[month]} ${date}, ${year}`);
        
        if (isToday) {
          cell.classList.add("calendar__today");
          cell.setAttribute("aria-current", "date");
        }

        date++;
      }
      row.appendChild(cell);
    }

    calendarBody.appendChild(row);

    if (date > daysInMonth) break;
  }
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
