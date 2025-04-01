import { animateShiftUp, animateShiftDown } from "./shift";

export function addDragEvents(item) {
  item.addEventListener(("dragstart"), () => {
    this.list.classList.add("event-dragging");
    item.classList.add("is-dragging");
    this.dragging = item;
  });

  item.addEventListener(("dragend"), () => {
    this.list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
    item.setAttribute("draggable", "false");
    this.dragging.querySelector(this.settings.handle).focus();
    this.dragging = null;
    this.maybeUpdate(item);
  });

  item.addEventListener(("dragenter"), () => {
    // Don't do anything if it's the thing being dragged
    if (item === this.dragging) return;

    // Don't do anything if item is currently animating
    if (item.getAnimations().length) return;

    // Get the rects before moving items
    const fromRect = this.dragging.getBoundingClientRect();
    const toRect = item.getBoundingClientRect();
    
    // Compare the top position of dragging to the center location of item
    if (this.dragging.getBoundingClientRect().top > item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2) {
      item.before(this.dragging);
      animateShiftUp(this.dragging, toRect, this.settings.duration);
      animateShiftDown(item, fromRect, this.settings.duration);
    } else {
      item.after(this.dragging);
      animateShiftUp(item, fromRect, this.settings.duration);
      animateShiftDown(this.dragging, toRect, this.settings.duration);
    }

    // Set our save tracker to true
    this.hasUpdated = true;
  });

  item.addEventListener(("dragover"), (event) => {
    // Prevent default to allow drop event to fire. This is required
    event.preventDefault();
  });

  item.addEventListener(("drop"), (event) => {
    // Prevent default action (open as link for some elements)
    event.preventDefault();
  });
}
