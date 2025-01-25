import "./src/avatar.scss";
import "./src/sortable.scss";
import sortable from "./src/sortable";

sortable("sortable-list", {
  onUpdate() {
    console.log("Save sort...");
  }
});
