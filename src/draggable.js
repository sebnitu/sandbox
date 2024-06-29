const list = document.querySelector(".sortable");
const items = document.querySelectorAll(".sortable__item");

items.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("is-clicked")) return;
    item.classList.add("is-clicked");
    setTimeout(() => {
      item.classList.remove("is-clicked");
    }, 1000);
  });

  item.addEventListener(("dragstart"), () => {
    list.classList.add("event-dragging");
    item.classList.add("is-dragging");
  });

  item.addEventListener(("dragend"), () => {
    list.classList.remove("event-dragging");
    item.classList.remove("is-dragging");
  });

  item.addEventListener(("dragenter"), (event) => {
    item.classList.add("is-dragover");
  });

  item.addEventListener(("dragleave"), (event) => {
    item.classList.remove("is-dragover");
  });

  item.addEventListener(("dragover"), (event) => {
    // Prevent default to allow drop event to fire. This is required.
    event.preventDefault();
  });

  item.addEventListener(("drop"), (event) => {
    // Prevent default action (open as link for some elements).
    event.preventDefault();

    // Get the element being dragged.
    const dragging = list.querySelector(".is-dragging");

    // Remove all active dragover class.
    item.classList.remove("is-dragover");

    // Swap the two elements in the dom.
    swap(dragging, item);
  });
});

function swap(node1, node2) {
  // Create marker element and insert it where node1 is.
  const temp = document.createElement("div");
  node1.parentNode.insertBefore(temp, node1);

  // Move node1 to right before node2.
  node2.parentNode.insertBefore(node1, node2);

  // Move node2 to right before where node1 used to be.
  temp.parentNode.insertBefore(node2, temp);

  // Remove temporary marker node.
  temp.parentNode.removeChild(temp);
}
