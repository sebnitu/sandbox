export function filter(input, list, status = null, toggle = { show: 'is-visible', hide: 'is-hidden' }) {
  // Show/hide individual results as the user types in the text field.
  input.addEventListener('input', (event) => {
    const listItems = list.querySelectorAll('li');

    const filteredList = Array.prototype.slice.call(listItems).filter(function (listItem) {
      const itemValue = listItem.querySelector('[data-filter-value]').innerText.toLowerCase();
      const inputValue = event.target.value.toLowerCase();
      return itemValue.includes(inputValue);
    });

    // Hide all results at first.
    listItems.forEach(function (item) {
      // listItem.style.display = 'none';
      item.classList.add(toggle.hide);
      item.classList.remove(toggle.show);
    });

    // Show only the results that match the filter.
    filteredList.forEach(function (item) {
      // listItem.style.display = 'flex';
      item.classList.remove(toggle.hide);
      item.classList.add(toggle.show);
    });

    if (status) {
      filterStatus(status, filteredList.length + ' results available. Use Tab to access.');
    }
  });
}

function filterStatus(el, message) {
  // Announce to screen reader users that new results are available, and remind them how to reach them.
  el.innerHTML = ''; // clear the previous content so that the next line will always cause a screen reader announcement, even if the number of results is the same.
  el.innerHTML = message;

  // After the screen reader has had some time to announce the line above, empty out the live region so that its text can't be reached with a virtual cursor.
  setTimeout(function () {
    el.innerHTML = '';
  }, 100);
}
