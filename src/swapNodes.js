/**
 * Swaps the position of two HTML node elements in the DOM.
 * @param {HTMLElement} node1 
 * @param {HTMLElement} node2 
 */
export function swapNodes(node1, node2) {
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
