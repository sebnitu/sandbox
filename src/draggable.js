const list = document.querySelector(".sortable");
const items = document.querySelectorAll(".sortable__item");
let dragging = null;
let reqSave = false;

items.forEach((item) => {
  // Get the handle element and toggle draggable on item if it exists.
  const handle = item.querySelector(".sortable__handle");
  if (handle) {
    item.setAttribute("draggable", "false");

    handle.addEventListener("mousedown", () => {
      item.setAttribute("draggable", "true");
    });
  
    handle.addEventListener("mouseup", () => {
      item.setAttribute("draggable", "false");
    });
  }

  /**
   * Click events
   * Used to test that click are not being blocked.
   */

  item.addEventListener("click", () => {
    if (item.classList.contains("is-clicked")) return;
    item.classList.add("is-clicked");
    setTimeout(() => {
      item.classList.remove("is-clicked");
    }, 1000);
  });

  /**
   * Drag events
   */

  item.addEventListener(("dragstart"), () => {
    list.classList.add("event-dragging");
    item.classList.add("is-dragging");
    dragging = item;
  });

  item.addEventListener(("dragend"), () => {
    list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
    dragging = null;
    if (reqSave) {
      console.log("Save order");
      if (handle) item.setAttribute("draggable", "false");
      reqSave = false;
    }
  });

  item.addEventListener(("dragenter"), () => {
    // Don't do anything if it's the thing being dragged.
    if (item === dragging) return;

    // Don't do anything if item is currently animating.
    if (item.getAnimations().length) return;

    // Get the rects before moving items.
    const fromRect = dragging.getBoundingClientRect();
    const toRect = item.getBoundingClientRect();
    
    // Compare the top position of dragging to the center location of item.
    if (dragging.getBoundingClientRect().top > item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2) {
      item.before(dragging);
    } else {
      item.after(dragging);
    }

    // Set our save tracker to true.
    reqSave = true;

    // Animate the items
    animateSortable(dragging, fromRect, toRect, 150);
    animateSortable(item, toRect, fromRect, 150);
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
    if (handle) item.setAttribute("draggable", "false");
    reqSave = false;
  });

  /**
   * Touch events
   * 
   * TODO: Add support for touch events
   * Element: touchcancel
   * Element: touchend
   * Element: touchmove
   * Element: touchstart
   */
});

function animateSortable(target, fromRect, toRect, duration) {
  const maxX = target.offsetWidth + parseInt(getComputedStyle(target.parentElement).gap);
  const maxY = target.offsetHeight + parseInt(getComputedStyle(target.parentElement).gap);
  let translateX = limit(fromRect.left - toRect.left, maxX);
  let translateY = limit(fromRect.top - toRect.top, maxY);

  const transformAnimation = [
    { transform: `translate3D(${translateX}px, ${translateY}px, 0)` },
    { transform: "translate3d(0, 0, 0)" },
  ];

  target.animate(transformAnimation, { duration, easing: "ease" });
}

function limit(value, max) {
  if (value > 0) {
    return (value > max) ? max : value;
  } else {
    return (value < (max * -1)) ? max : value;
  }
}
