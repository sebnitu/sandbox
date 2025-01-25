import { animateShiftUp, animateShiftDown } from "./shift";

export function addHandleEvents(item) {
  const handle = item.querySelector(this.settings.handle);
  if (handle) {
    // Setup the initial handles draggable attribute
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

    // Setup the keyboard events on the handle
    handle.addEventListener("keydown", (event) => {
      // Initialize the sibling var
      let sibling = null

      // Go through event key cases
      switch (event.key) {
        case 'ArrowUp':
          sibling = item.previousElementSibling;
          if (sibling) {

            // Get the rects before moving items
            const fromRect = item.getBoundingClientRect();
            const toRect = sibling.getBoundingClientRect();

            sibling.before(item);
            animateShiftUp(item, toRect, this.settings.duration);
            animateShiftDown(sibling, fromRect, this.settings.duration);

            // Return focus to handle
            handle.focus();

            // Run the updated function
            this.maybeUpdate(true);
          }
          return;
    
        case 'ArrowDown':
          sibling = item.nextElementSibling;
          if (sibling) {

            // Get the rects before moving items
            const fromRect = item.getBoundingClientRect();
            const toRect = sibling.getBoundingClientRect();

            sibling.after(item);
            animateShiftUp(sibling, fromRect, this.settings.duration);
            animateShiftDown(item, toRect, this.settings.duration);

            // Return focus to handle
            handle.focus();

            // Run the updated function
            this.maybeUpdate(true);
          }
          return;
    
        default:
          return;
      }
    });
  }
}
