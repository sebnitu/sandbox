import { addHandleEvents } from "./handle";
import { addDragEvents } from "./drag";
import { addTouchEvents } from "./touch";

export function refresh(entry, delay = 0) {
  // clearTimeout if refresh has already been called but not run
  if (typeof entry.timeoutID === "number") {
    clearTimeout(entry.timeoutID);
  }

  entry.timeoutID = setTimeout(() => {
    // Get the current list items in the DOM
    const items = Array.from(entry.list.querySelectorAll(entry.settings.items));

    // Initialize our indexes array
    let indexes = [];

    // Build our indexes for things that no longer exists in the DOM
    for (let index = 0; index < entry.items.length; index++) {
      const result = items.findIndex((item) => item == entry.items[index]);
      if (result < 0) indexes.push(index);
    }

    // Remove the items from our entry items array that no longer exist
    indexes.reverse().forEach((index) => {
      entry.items.splice(index, 1);
    });

    // Add new items to our entry items array that have been added in the DOM
    items.forEach((item) => {
      const index = entry.items.findIndex((entryItem) => entryItem == item);
      if (index < 0) {
        // Add the new item to our entry items array
        entry.items.push(item);

        // Setup the event listeners for the new sortable item
        addHandleEvents.call(entry, item);
        addDragEvents.call(entry, item);
        addTouchEvents.call(entry, item);
      }
    });
  }, delay);
}
