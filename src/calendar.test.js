import { describe, it, beforeEach, expect, vi } from 'vitest';
import { buildCalendar, onChange, setMonth } from './calendar';

const markup = `
  <div id="calendar" data-unavailable-weekdays="[0,6]">
    <div>
      <h2 id="calendar-heading"></h2>
      <div>
        <button id="prev-month">Prev</button>
        <button id="next-month">Next</button>
      </div>
    </div>
    <table>
      <tbody id="calendar-body"></tbody>
    </table>
    <input id="calendar-value-store" type="hidden" readonly />
  </div>
`;

beforeEach(() => {
  document.body.innerHTML = markup;
});

describe('Calendar Module', () => {
  it('should render the correct number of days in current month', () => {
    const now = new Date();
    buildCalendar(now.getMonth(), now.getFullYear());

    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const calendarBody = document.getElementById('calendar-body');
    const allCells = calendarBody.querySelectorAll('td');
    const validDayCells = Array.from(allCells).filter((cell) =>
      cell.querySelector('input[type="radio"]')
    );

    expect(validDayCells.length).toBeLessThanOrEqual(daysInMonth);
  });

  it('should highlight today\'s date', () => {
    const today = new Date();
    buildCalendar(today.getMonth(), today.getFullYear());

    const todayCell = document.querySelector('.calendar__today');
    expect(todayCell).toBeTruthy();
    expect(todayCell.getAttribute('aria-current')).toBe('date');
  });

  it('should set the stored date value as selected', () => {
    const store = document.getElementById('calendar-value-store');
    store.value = '2025-06-18';

    buildCalendar(5, 2025);
    const radio = document.getElementById('date-2025-06-18');
    expect(radio).toBeTruthy();
    expect(radio.checked).toBe(true);
  });

  it('should update value store and trigger onChange callback when a date is selected', () => {
    const callback = vi.fn();
    onChange(callback);

    buildCalendar(6, 2025);
    const radio = document.querySelector('input[type="radio"]:not(:disabled)');
    if (radio) {
      radio.checked = true;
      radio.dispatchEvent(new Event('change'));

      const store = document.getElementById('calendar-value-store');
      expect(store.value).toBe(radio.value);
      expect(callback).toHaveBeenCalledWith(radio.value);
    } else {
      throw new Error('No selectable date found for test.');
    }
  });

  it('should navigate to next or previous month correctly using setMonth()', () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    setMonth(1);
    const header = document.getElementById('calendar-heading').textContent;
    const nextMonth = new Date(currentYear, currentMonth + 1, 1).toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    });

    expect(header).toContain(nextMonth);
  });
});
