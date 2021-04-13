const defaults = {
  selectorDropdown: '.select-dropdown',
  selectorOption: '.select-dropdown__option',
  stateSelected: 'is-selected',
  stateOpened: 'is-opened'
};

let settings = {};

const matchInput = (el) => {
  const input = el.previousElementSibling;
  const value = input.value.trim();
  if (value === '') {
    const current = el.querySelectorAll(`.${settings.stateSelected}`);
    current.forEach((el) => {
      el.classList.remove(settings.stateSelected);
    });
  } else {
    const options = el.querySelectorAll(settings.selectorOption);
    options.forEach((item) => {
      if (value === item.innerText.trim()) {
        item.classList.add(settings.stateSelected);
      } else {
        item.classList.remove(settings.stateSelected);
      }
    });
  }
};

const isOpened = (el) => {
  return el.classList.contains(settings.stateOpened);
};

const isClosed = (el) => {
  return !el.classList.contains(settings.stateOpened);
};

const openDropdown = (el) => {
  const options = el.querySelectorAll(settings.selectorOption);
  if (options.length) {
    if (isClosed(el)) {
      matchInput(el);
    }
    el.classList.add(settings.stateOpened);
  }
};

const closeDropdown = (el) => {
  el.classList.remove(settings.stateOpened);
};

const selectItem = (el, dir) => {
  if (isClosed(el)) { return; }
  // Check that list isnt empty
  const options = el.querySelectorAll(settings.selectorOption);
  if (!options.length) { return; }

  // Check if item is already selected
  const current = el.querySelector(`.${settings.stateSelected}`);
  if (current) {
    if (dir === 'prev') {
      const prev = current.previousElementSibling;
      if (prev) {
        current.classList.remove(settings.stateSelected);
        prev.classList.add(settings.stateSelected);
      }
    } else if (dir === 'next') {
      const next = current.nextElementSibling;
      if (next) {
        current.classList.remove(settings.stateSelected);
        next.classList.add(settings.stateSelected);
      }
    }
  } else {
    el.querySelector(`${settings.selectorOption}:first-child`).classList.add(settings.stateSelected);
  }
};

const returnSelected = (el) => {
  const current = el.querySelector(`.${settings.stateSelected}`);
  if (current) {
    const input = el.previousElementSibling;
    input.value = current.innerText;
    closeDropdown(el);
  }
};

const keyRouting = (el, event) => {
  switch (event.key) {
    case 'Enter':
      returnSelected(el);
      event.preventDefault();
      return;

    case 'ArrowUp':
      selectItem(el, 'prev');
      openDropdown(el);
      return;

    case 'ArrowDown':
      selectItem(el, 'next');
      openDropdown(el);
      return;

    case 'Tab':
      if (isOpened(el)) {
        closeDropdown(el);
        event.preventDefault();
      }
      return;

    case 'Escape':
      closeDropdown(el);
      event.preventDefault();
      return;

    default:
      return;
  }
};

const init = (options) => {
  settings = { ...defaults, ...options };
  const selectDropdowns = document.querySelectorAll(settings.selectorDropdown);
  selectDropdowns.forEach((el) => {
    const input = el.previousElementSibling;
    if (input && input.tagName === 'INPUT') {
      input.addEventListener('input', () => {
        matchInput(el);
      });
      input.addEventListener('focus', () => {
        openDropdown(el);
      });
      input.addEventListener('blur', () => {
        closeDropdown(el);
      });
      input.addEventListener('keydown', keyRouting.bind(null, el));
    }
  });
};

init();
