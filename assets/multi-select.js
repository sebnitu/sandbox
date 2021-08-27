export function filter(input, list) {
  /** Show/hide individual results as the user types in the text field. */
  input.addEventListener('input', function (event) {
    console.log('...');

    var filteredList = Array.prototype.slice.call(list).filter(function (listItem) {
      return listItem.querySelector('label').innerText.toLowerCase().includes(event.target.value.toLowerCase());
    });

    // Hide all results at first.
    list.forEach(function (listItem) {
      listItem.style.display = 'none';
    });

    // Show only the results that match the filter.
    filteredList.forEach(function (listItem) {
      listItem.style.display = 'flex';
    });

    // // Announce to screen reader users that new results are available, and remind them how to reach them.
    // liveRegion.innerHTML = '';  // clear the previous content so that the next line will always cause a screen reader announcement, even if the number of results is the same.
    // liveRegion.innerHTML = filteredList.length + ' results available. Use Tab to access.';

    // // After the screen reader has had some time to announce the line above, empty out the live region so that its text can't be reached with a virtual cursor.
    // setTimeout(function () {
    //   liveRegion.innerHTML = '';
    // }, 100);
  });
}
