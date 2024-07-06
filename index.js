import "./src/crosshair.css";
import { addCrosshair, updateCrosshair } from "./src/crosshair";

addCrosshair();

document.addEventListener("click", (event) => {
  updateCrosshair(event);
});
