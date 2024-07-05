import "./src/select-dropdown.css";
import { selectDropdown } from "./src/select-dropdown";

const dropdown = selectDropdown();

dropdown.clickOptionSetup();

const all = document.querySelectorAll('.custom-select-dropdown');

all.forEach((el) => {
  dropdown.register(el);
});
