const defaults = {
  anchorPadding: 10,
  selectorInput: 'input',
  selectorDropdown: '.select-dropdown',
  selectorOption: '.select-dropdown__option',
  stateSelected: 'is-selected',
  stateOpened: 'is-opened'
};

let settings = {};

const anchorPositionStart = (el, anchor) => {
  return anchor.offsetTop - (settings.anchorPadding);
};

const anchorPositionEnd = (el, anchor) => {
  return anchor.offsetTop - (el.offsetHeight - (
    anchor.offsetHeight + settings.anchorPadding
  ));
};

const anchorPositionNearest = (el, anchor) => {
  const posTop = anchorPositionStart(el, anchor);
  const posBot = anchorPositionEnd(el, anchor);
  if (el.scrollTop > posTop) { return posTop; }
  if (el.scrollTop < posBot) { return posBot; }
  return false;
};

const scrollIntoView = (el) => {
  const anchor = el.querySelector(`.${settings.stateSelected}`);
  if (!anchor) { return; }
  const position = anchorPositionNearest(el, anchor);
  if (!position) { return; }
  el.scroll({
    top: anchorPositionNearest(el, anchor)
  });
};

const matchInput = (el) => {
  const input = el.parentElement.querySelector(settings.selectorInput);
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
        scrollIntoView(el);
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
    scrollIntoView(el);
  }
};

const closeDropdown = (el) => {
  el.classList.remove(settings.stateOpened);
};

const selectItem = (el, dir) => {
  if (isClosed(el)) { return; }
  const options = el.querySelectorAll(settings.selectorOption);
  if (!options.length) { return; }

  const current = el.querySelector(`.${settings.stateSelected}`);
  if (current) {
    const option = (dir === 'prev') ?
      current.previousElementSibling :
      current.nextElementSibling;
    if (option) {
      current.classList.remove(settings.stateSelected);
      option.classList.add(settings.stateSelected);
      scrollIntoView(option.closest(settings.selectorDropdown));
    }
  } else {
    el.querySelector(`${settings.selectorOption}:first-child`).classList.add(settings.stateSelected);
  }
};

const returnSelected = (el) => {
  const current = el.querySelector(`.${settings.stateSelected}`);
  if (current) {
    const input = el.parentElement.querySelector(settings.selectorInput);
    input.value = current.innerText;
  }
};

const keyRouting = (el, event) => {
  switch (event.key) {
    case 'Enter':
      returnSelected(el);
      closeDropdown(el);
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
        returnSelected(el);
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
    const input = el.parentElement.querySelector(settings.selectorInput);
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
