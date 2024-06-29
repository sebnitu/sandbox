import { sortNodes } from "./sortNodes";
import { swapNodes } from "./swapNodes";

const list = document.querySelector(".sortable");
const items = document.querySelectorAll(".sortable__item");

items.forEach((item) => {

  /**
   * Click events
   */

  item.addEventListener("click", () => {
    if (item.classList.contains("is-clicked")) return;
    item.classList.add("is-clicked");
    setTimeout(() => {
      item.classList.remove("is-clicked");
    }, 1000);
  });

  /**
   *  Drag events
   */

  item.addEventListener(("dragstart"), () => {
    list.classList.add("event-dragging");
    item.classList.add("is-dragging");
  });

  item.addEventListener(("dragend"), () => {
    list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
  });

  item.addEventListener(("dragenter"), (event) => {
    item.classList.add("is-dragover");
  });

  item.addEventListener(("dragleave"), (event) => {
    item.classList.remove("is-dragover");
  });

  item.addEventListener(("dragover"), (event) => {
    // Prevent default to allow drop event to fire. This is required.
    event.preventDefault();
  });

  item.addEventListener(("drop"), (event) => {
    // Prevent default action (open as link for some elements).
    event.preventDefault();

    // Get the element being dragged.
    const dragging = list.querySelector(".is-dragging");

    // Remove all active dragover class.
    item.classList.remove("is-dragover");

    // Swap the two elements in the dom.
    swapNodes(dragging, item);
  });

  /**
   * Touch events
   */

  item.addEventListener("touchstart", () => {
    console.log("touchstart");
    list.classList.add("event-dragging");
    item.classList.add("is-dragging");
  });

  item.addEventListener("touchend", () => {
    console.log("touchend");
    list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
  });

  item.addEventListener("touchcancel", () => {
    console.log("touchcancel");
    list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
  });

  item.addEventListener("touchmove", () => {
    console.log("touchmove");
    list.classList.add("event-dragging");
    item.classList.add("is-dragging");
  });

});
