import "./src/avatar.scss";
import "./src/sortable.scss";
import sortable from "./src/sortable";

sortable("sortable-list", {
  items: ".sortable__item",
  handle: ".sortable__handle",
  onUpdate(item) {
    // Example of using the onUpdate callback
    const list = Array.from(this.list.querySelectorAll(this.settings.items));
    const index = list.indexOf(item);
    console.log("Save sort...", item, index);
  }
});
