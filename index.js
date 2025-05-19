import "./src/calendar.scss";
import { buildCalendar, setMonth, onChange, value } from "./src/calendar";

let today = new Date();
buildCalendar(today.getMonth(), today.getFullYear());

const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

prevMonthBtn.addEventListener("click", () => {
  setMonth(-1);
});

nextMonthBtn.addEventListener("click", () => {
  setMonth(1);
});

onChange((result) => {
  console.log("Value:", value());
});
