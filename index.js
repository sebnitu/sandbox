import "./src/avatar.scss";
import "./src/sortable.scss";
import sortable from "./src/sortable";

const list = sortable("sortable-list", {
  onUpdate(obj) {
    console.log("onUpdate >", obj);
  }
});

console.log(list);
