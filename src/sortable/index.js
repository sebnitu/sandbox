import defaults from "./defaults";
import { register } from "./register";

export default function sortable(id, config) {
  config = {...defaults, ...config};
  const list = document.getElementById(id);
  if (list) {
    // Destructure onUpdate from config and retain the rest in settings
    const { onUpdate, ...settings } = config;

    // Run the register function 
    return register({
      list: list,
      onUpdated: onUpdate ?? (() => {}),
      settings: settings
    });
  } else {
    throw new Error(`Sortable could not find list with ID of "${id}"`);
  }
}
