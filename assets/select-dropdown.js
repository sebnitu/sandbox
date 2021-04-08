const selectDropdowns = document.querySelectorAll('.select-dropdown');

selectDropdowns.forEach((el) => {
  const input = el.previousElementSibling;
  if (input && input.tagName === 'INPUT') {
    input.addEventListener('focus', (event) => {
      // 1. Open dropdown
      openDropdown(el);
      // 2. Start listening for keyboard routing
      input.addEventListener('keydown', keyRouting.bind(null, el));
    }, false);
    input.addEventListener('blur', (event) => {
      // 1. Close dropdown
      closeDropdown(el);
      // 2. Remove keyboard routing
      input.removeEventListener('keydown', keyRouting.bind(null, el));
    });
  }
});

const keyRouting = (el, event) => {
  console.log(event.key);
  console.log(el);
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

    case 'Space':
      openDropdown(el);
      return;

    case 'Tab':
      closeDropdown(el);
      event.preventDefault();
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
