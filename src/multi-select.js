export function multiSelect(el, checkboxes) {
  const btnText = el.querySelector('.multi-select__button-text');
  const output = el.querySelector('.multi-select__output');
  const options = Array.from(el.querySelectorAll('[data-filter-value]'));

  // Set the initial state
  updateSelected(checkboxes, btnText, output);

  // Update selected when a checkbox value changes
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      updateSelected(checkboxes, btnText, output);
    });
  });

  // Global event listener for remove buttons
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-multi-select-remove]');
    if (trigger) {
      const value = trigger.getAttribute('data-multi-select-remove');
      const result = options.find((item) => {
        return item.innerText.toLowerCase().includes(value);
      });
      result.parentElement.querySelector('input[type="checkbox"]').checked = false;
      updateSelected(checkboxes, btnText, output);
    }
  });
}

function updateSelected(checkboxes, btnText, output) {
  const selected = getSelectedValues(checkboxes);
  if (btnText) updateSelectedText(btnText, selected);
  if (output) updateSelectedList(output, selected);
}

function updateSelectedText(el, selected, defaultValue = 'Choose at least one') {
  el.innerHTML = '';
  if (selected.length > 0) {
    selected.forEach(function (value, index) {
      el.innerHTML += value;
      if (index < selected.length - 1) {
        el.innerHTML += ', ';
      }
    });
  } else {
    el.innerHTML = defaultValue;
  }
}

function updateSelectedList(el, selected, defaultValue = 'Nothing selected yet...') {
  // Get rid of any previous tags
  el.innerHTML = '';

  // Build up a list of "remove" buttons (tags) for each checked option
  if (selected.length > 0) {
    const list = document.createElement('ul');
    list.classList.add('list-style-none');
    list.classList.add('flex');

    selected.forEach((item) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.setAttribute('data-multi-select-remove', item.toLowerCase());
      button.classList.add('button');
      button.innerHTML = '<span>' + item + '</span> ' +
        '<svg class="icon icon_size_sm" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>' +
        '<span class="sr-only">Unselect</span>';
      li.appendChild(button);
      list.appendChild(li);
    });

    el.appendChild(list);
  } else {
    el.innerHTML = defaultValue;
  }
}

function getSelectedValues(items) {
  const values = [];
  items.forEach((item) => {
    if (item.checked) {
      const value = item.closest('.filter__option').querySelector('[data-filter-value]').innerText;
      values.push(value);
    }
  });
  return values;
}
