let crosshair = null;

export function addCrosshair(x, y) {
  if (!crosshair) {
    crosshair = document.createElement("div");
    crosshair.classList.add("crosshair");
    if (y) crosshair.style.setProperty("--crosshair-y", y + "px");
    if (x) crosshair.style.setProperty("--crosshair-x", x + "px");
    document.body.append(crosshair);
  } else {
    console.error("Crosshair element already exists.");
  }
}

export function updateCrosshair(point) {
  if (crosshair) {
    crosshair.style.setProperty("--crosshair-y", point.clientY + "px");
    crosshair.style.setProperty("--crosshair-x", point.clientX + "px");
  } else {
    console.error("Crosshair element does not exist.");
  }
}
