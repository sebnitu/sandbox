import { animateShiftUp, animateShiftDown } from "./shift";

function setCache(item) {
  this.cacheItem = item;
  setTimeout(() => {
    this.cacheItem = null;
  }, this.settings.cacheDuration);
}

function isInside(point, rect) {
  return (
    point.clientX > rect.left && 
    point.clientX < rect.right &&
    point.clientY > rect.top &&
    point.clientY < rect.bottom
  );
}

export function addTouchEvents(item) {
  const handle = item.querySelector(this.settings.handle);
  handle.addEventListener("touchstart", () => {
    this.list.classList.add("event-touching");
    item.classList.add("is-touching");
    this.dragging = item;
  });

  handle.addEventListener("touchmove", (event) => {
    event.preventDefault();

    // Find out where the touchend stopped
    const listRect = this.list.getBoundingClientRect();

    // Check if touchend stopped inside the list box
    if (isInside(event.changedTouches[0], listRect)) {
      const item = [...this.items].find((item) => {
        return (
          item != this.dragging && 
          !item.getAnimations().length &&
          isInside(event.changedTouches[0], item.getBoundingClientRect())
        );
      });
      
      // Guard if we're not inside an item
      if (!item) return;

      // Guard if we're inside a cached item
      if (item === this.cacheItem) return;

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

      // Store our cache item
      setCache.call(this, item);

      // Set our save tracker to true
      this.hasUpdated = true;
    }
  });

  handle.addEventListener("touchend", () => {
    this.list.classList.remove("event-touching");
    item.classList.remove("is-touching");
    this.dragging.querySelector(this.settings.handle).focus();
    this.dragging = null;
    this.maybeUpdate(item);
  });

  handle.addEventListener("touchcancel", () => {
    this.list.classList.remove("event-touching");
    item.classList.remove("is-touching");
    this.dragging.querySelector(this.settings.handle).focus();
    this.dragging = null;
    this.maybeUpdate(item);
  });
}
