import { addHandleEvents } from "./handle";
import { addDragEvents } from "./drag";
import { addTouchEvents } from "./touch";
import { refresh } from "./refresh";

export function register(obj) {
  // Build the entry object
  const entry = {...obj};
  entry.id = entry.list.id;
  entry.items = Array.from(entry.list.querySelectorAll(entry.settings.items));

  entry.dragging = null;
  entry.cacheItem = null;
  entry.hasUpdated = false;

  // Add the maybeUpdate method to the entry
  entry.maybeUpdate = (force = false) => {
    if (entry.hasUpdated || force) {
      // Set has updated to false
      entry.hasUpdated = false;

      // Sort the items array based on their position in the document
      entry.items.sort((a, b) => {
        if (a === b) return 0;
        if (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_PRECEDING) {
          return 1;
        } else {
          return -1;
        }
      });

      // Run the `onUpdated` callback
      entry.onUpdated.call(entry, entry);
    }
  };

  // Loop through the list items
  entry.items.forEach((item) => {
    // Setup the event listeners for the sortable item
    addHandleEvents.call(entry, item);
    addDragEvents.call(entry, item);
    addTouchEvents.call(entry, item);
  });

  // Add the refresh method to the entry
  entry.refresh = () => refresh(entry);

  // Return the entry object
  return entry;
}
