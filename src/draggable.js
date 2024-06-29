const list = document.querySelector(".sortable");
const items = document.querySelectorAll(".sortable__item");
let dragging = null;

items.forEach((item) => {

  // Click event
  // Used to test that click are not being blocked.
  item.addEventListener("click", () => {
    if (item.classList.contains("is-clicked")) return;
    item.classList.add("is-clicked");
    setTimeout(() => {
      item.classList.remove("is-clicked");
    }, 1000);
  });

  // TODO: Catch the "canceled" drop event
  // Drag events
  // HTMLElement: drag
  // HTMLElement: dragend
  // HTMLElement: dragenter
  // HTMLElement: dragleave
  // HTMLElement: dragover
  // HTMLElement: dragstart
  // HTMLElement: drop

  item.addEventListener(("dragstart"), () => {
    list.classList.add("event-dragging");
    item.classList.add("is-dragging");
    dragging = item;
  });

  item.addEventListener(("dragend"), () => {
    list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
    dragging = null;
  });

  item.addEventListener(("dragenter"), (event) => {
    // Compare the top position of dragging to the center location of item.
    if (dragging.getBoundingClientRect().top > item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2) {
      item.before(dragging);
    } else {
      item.after(dragging);
    }
  });

  item.addEventListener(("dragover"), (event) => {
    // Prevent default to allow drop event to fire. This is required.
    event.preventDefault();
  });

  item.addEventListener(("drop"), (event) => {
    // Prevent default action (open as link for some elements).
    event.preventDefault();

    // Do action to save order of items here.
    console.log("Save order");
  });

  // TODO: Add support for touch events
  // Touch events
  // Element: touchcancel
  // Element: touchend
  // Element: touchmove
  // Element: touchstart

});
