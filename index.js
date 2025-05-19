import "./src/calendar.scss";
import { buildCalendar, setMonth, onChange, value } from "./src/calendar";

buildCalendar();

const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

prevMonthBtn.addEventListener("click", () => {
  setMonth(-1);
});

nextMonthBtn.addEventListener("click", () => {
  setMonth(1);
});

onChange((result) => {
  console.log("Value:", value(), result);
});
