import "./src/avatar.scss";
import "./src/sortable.scss";
import sortable from "./src/sortable";

sortable("sortable-list", {
  onUpdate(item) {
    // Example of desifing the onUpdate callback
    const list = Array.from(this.list.querySelectorAll(this.settings.items));
    const index = list.indexOf(item);
    console.log("Save sort...", item, index);
  }
});
