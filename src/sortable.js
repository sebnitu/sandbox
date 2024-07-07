const list = document.querySelector(".sortable");
const items = list.querySelectorAll(".sortable__item");
const duration = 150;
let dragging = null;
let reqSave = false;

items.forEach((item) => {
  /**
   * Click event
   * Used to test that clicks are not being blocked by drag or touch events.
   */

  item.addEventListener("click", (event) => {
    if (event.target.closest(".sortable__handle")) return;
    if (item.classList.contains("is-clicked")) return;
    item.classList.add("is-clicked");
    setTimeout(() => {
      item.classList.remove("is-clicked");
    }, 1000);
  });
  
  /**
   * Handle and draggable toggle
   */

  const handle = item.querySelector(".sortable__handle");
  if (handle) {
    item.setAttribute("draggable", "false");

    handle.addEventListener("mousedown", () => {
      item.setAttribute("draggable", "true");
    });
  
    handle.addEventListener("mouseup", () => {
      item.setAttribute("draggable", "false");
    });

    handle.addEventListener("focus", () => {
      item.setAttribute("draggable", "true");
    });
  
    handle.addEventListener("blur", () => {
      item.setAttribute("draggable", "false");
    });
  }

  /**
   * Keyboard events
   */

  handle.addEventListener("keydown", (event) => {
    // Initialize the sibling var.
    let sibling = null

    // Go through event key cases.
    switch (event.key) {
      case 'ArrowUp':
        sibling = item.previousElementSibling;
        if (sibling) {

          // Get the rects before moving items.
          const fromRect = item.getBoundingClientRect();
          const toRect = sibling.getBoundingClientRect();

          sibling.before(item);
          animateShiftUp(item, fromRect, toRect);
          animateShiftDown(sibling, toRect, fromRect);

          // Return focus to handle.
          handle.focus();
        }
        return;
  
      case 'ArrowDown':
        sibling = item.nextElementSibling;
        if (sibling) {

          // Get the rects before moving items.
          const fromRect = item.getBoundingClientRect();
          const toRect = sibling.getBoundingClientRect();

          sibling.after(item);
          animateShiftUp(sibling, fromRect, toRect);
          animateShiftDown(item, toRect, fromRect);

          // Return focus to handle.
          handle.focus();
        }
        return;
  
      default:
        return;
    }
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
    const dragHandle = dragging.querySelector(".sortable__handle");
    list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
    dragging = null;
    if (reqSave) {
      console.log("Save order");
      if (dragHandle) dragHandle.focus();
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
      animateShiftUp(dragging, fromRect, toRect);
      animateShiftDown(item, toRect, fromRect);
    } else {
      item.after(dragging);
      animateShiftUp(item, toRect, fromRect);
      animateShiftDown(dragging, fromRect, toRect);
    }

    // Set our save tracker to true.
    reqSave = true;
  });

  item.addEventListener(("dragover"), (event) => {
    // Prevent default to allow drop event to fire. This is required.
    event.preventDefault();
  });

  item.addEventListener(("drop"), (event) => {
    // Prevent default action (open as link for some elements).
    event.preventDefault();

    const dragHandle = dragging.querySelector(".sortable__handle");

    // Do action to save order of items here.
    console.log("Save order");
    if (dragHandle) dragHandle.focus();
    if (handle) item.setAttribute("draggable", "false");
    reqSave = false;
  });

  /**
   * Touch events
   */
  
  handle.addEventListener("touchstart", () => {
    console.log("touchstart");
    list.classList.add("event-touching");
    item.classList.add("is-touching");
    dragging = item;
  });

  handle.addEventListener("touchmove", (event) => {
    event.preventDefault();

    // Find out where the touchend stopped.
    const listRect = list.getBoundingClientRect();

    // Check if touchend stopped inside the list box.
    if (isInside(event.changedTouches[0], listRect)) {
      const item = [...items].find((item) => {
        return (
          item != dragging && 
          !item.getAnimations().length &&
          isInside(event.changedTouches[0], item.getBoundingClientRect())
        );
      });

      // Guard if we're not inside an item.
      if (!item) return;

      // Get the rects before moving items.
      const fromRect = dragging.getBoundingClientRect();
      const toRect = item.getBoundingClientRect();

      // Compare the top position of dragging to the center location of item.
      if (dragging.getBoundingClientRect().top > item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2) {
        item.before(dragging);
        animateShiftUp(dragging, fromRect, toRect);
        animateShiftDown(item, toRect, fromRect);
      } else {
        item.after(dragging);
        animateShiftUp(item, toRect, fromRect);
        animateShiftDown(dragging, fromRect, toRect);
      }

      // Set our save tracker to true.
      reqSave = true;
    }
  });

  handle.addEventListener("touchend", (event) => {
    console.log("touchend");
    const dragHandle = dragging.querySelector(".sortable__handle");
    list.classList.remove("event-touching");
    item.classList.remove("is-touching");
    dragging = null;

    // Save if required.
    if (reqSave) {
      console.log("Save order");
      if (dragHandle) dragHandle.focus();
      reqSave = false;
    }
  });

  handle.addEventListener("touchcancel", (event) => {
    console.log("touchcancel", event);
    const dragHandle = dragging.querySelector(".sortable__handle");
    list.classList.remove("event-touching");
    item.classList.remove("is-touching");
    dragging = null;

    // Save if required.
    if (reqSave) {
      console.log("Save order");
      if (dragHandle) dragHandle.focus();
      reqSave = false;
    }
  });
});

function isInside(point, rect) {
  return (
    point.clientX > rect.left && 
    point.clientX < rect.right &&
    point.clientY > rect.top &&
    point.clientY < rect.bottom
  );
}

function animateShiftUp(...args) {
  animateShift(...args);
}

function animateShiftDown(...args) {
  animateShift(...args, "-");
}

function animateShift(target, fromRect, toRect, direction = "") {
  const maxX = target.offsetWidth + parseInt(getComputedStyle(target.parentElement).gap);
  const maxY = target.offsetHeight + parseInt(getComputedStyle(target.parentElement).gap);
  let translateX = limit((fromRect.left - toRect.left), maxX);
  let translateY = limit((fromRect.top - toRect.top), maxY);

  const transformAnimation = [
    { transform: `translate3D(${direction}${translateX}px, ${direction}${translateY}px, 0)` },
    { transform: "translate3d(0, 0, 0)" },
  ];

  target.animate(transformAnimation, { duration, easing: "ease" });
}

function limit(value, max) {
  value = Math.abs(value);
  return (value > max) ? max : value;
}
