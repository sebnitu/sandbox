const keyRouting = (el, event) => {
  switch (event.key) {
    case 'Enter':
      event.preventDefault();
      return;

    case 'ArrowUp':
      openDropdown(el);
      return;

    case 'ArrowDown':
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
}

const openDropdown = (el) => {
  el.classList.add('is-opened');
}

const closeDropdown = (el) => {
  el.classList.remove('is-opened');
}

const isOpened = (el) => {
  return el.classList.contains('is-opened');
}

const isClosed = (el) => {
  return !el.classList.contains('is-opened');
}

const selectDropdowns = document.querySelectorAll('.select-dropdown');

selectDropdowns.forEach((el) => {
  const input = el.previousElementSibling;
  if (input && input.tagName === 'INPUT') {
    input.addEventListener('focus', () => {
      // 1. Open dropdown
      openDropdown(el);
      // 2. Start listening for keyboard routing
      // input.addEventListener('keydown', keyRouting.bind(null, el), false);
    });
    input.addEventListener('blur', () => {
      // 1. Close dropdown
      closeDropdown(el);
      // 2. Remove keyboard routing
      // input.removeEventListener('keydown', keyRouting.bind(null, el), false);
    });
    input.addEventListener('keydown', keyRouting.bind(null, el));
  }
});
