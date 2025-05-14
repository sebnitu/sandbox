import "./src/calendar.scss";
import { buildCalendar, setMonth } from "./src/calendar";
import * as vrembem from "https://unpkg.com/vrembem@next/dev/index.js";

console.log("Vrembem", vrembem);

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
