export const selectDropdown = (options) => {

  const api = {};

  api.defaults = {
    anchorPadding: 10,
    clickOptionSetup: false,
    selectorInput: '.input',
    selectorDropdown: '.select-dropdown',
    selectorOption: '.select-dropdown__option',
    stateSelected: 'is-selected',
    stateOpened: 'is-opened'
  };
  api.settings = { ...api.defaults, ...options };

  const getInput = (dropdown) => {
    return dropdown.parentElement.querySelector(api.settings.selectorInput);
  };

  const getOptions = (dropdown) => {
    return dropdown.querySelectorAll(api.settings.selectorOption);
  };

  const getSelectedOption = (dropdown) => {
    return dropdown.querySelector(`.${api.settings.stateSelected}`);
  };

  const anchorPositionStart = (anchor) => {
    return anchor.offsetTop - (api.settings.anchorPadding);
  };

  const anchorPositionEnd = (el, anchor) => {
    return anchor.offsetTop - (el.offsetHeight - (
      anchor.offsetHeight + api.settings.anchorPadding
    ));
  };

  const anchorPositionNearest = (el, anchor) => {
    const posTop = anchorPositionStart(anchor);
    const posBot = anchorPositionEnd(el, anchor);
    if (el.scrollTop > posTop) { return posTop; }
    if (el.scrollTop < posBot) { return posBot; }
    return false;
  };

  const scrollIntoView = (el) => {
    const anchor = getSelectedOption(el);
    if (!anchor) { return; }
    const position = anchorPositionNearest(el, anchor);
    if (!position) { return; }
    el.scroll({
      top: anchorPositionNearest(el, anchor)
    });
  };

  const matchInput = (dropdown) => {
    const input = getInput(dropdown);
    const value = input.value.trim();
    if (value === '') {
      const selected = getSelectedOption(dropdown);
      if (selected) {
        selected.classList.remove(api.settings.stateSelected);
      }
    } else {
      const options = dropdown.querySelectorAll(api.settings.selectorOption);
      options.forEach((option) => {
        if (value === option.innerText.trim()) {
          option.classList.add(api.settings.stateSelected);
          scrollIntoView(dropdown);
        } else {
          option.classList.remove(api.settings.stateSelected);
        }
      });
    }
  };

  const isOpened = (dropdown) => {
    return dropdown.classList.contains(api.settings.stateOpened);
  };

  const isClosed = (dropdown) => {
    return !dropdown.classList.contains(api.settings.stateOpened);
  };

  const openDropdown = (dropdown) => {
    if (isClosed(dropdown)) {
      matchInput(dropdown);
    }
    dropdown.classList.add(api.settings.stateOpened);
    scrollIntoView(dropdown);
    dropdown.dispatchEvent(new CustomEvent('select-dropdown:opened', {
      detail: { input: getInput(dropdown) },
      bubbles: true
    }));
  };

  const closeDropdown = (dropdown) => {
    dropdown.classList.remove(api.settings.stateOpened);
  };

  const navigateOptions = (dropdown, dir) => {
    if (isClosed(dropdown)) { return; }
    const options = getOptions(dropdown);
    if (!options.length) { return; }
    const selected = getSelectedOption(dropdown);
    if (selected) {
      const option = (dir === 'prev') ?
        selected.previousElementSibling :
        selected.nextElementSibling;
      if (option) {
        selected.classList.remove(api.settings.stateSelected);
        option.classList.add(api.settings.stateSelected);
        scrollIntoView(option.closest(api.settings.selectorDropdown));
      }
    } else {
      const firstOption = dropdown.querySelector(
        `${api.settings.selectorOption}:first-child`
      );
      firstOption.classList.add(api.settings.stateSelected);
    }
  };

  const returnSelected = (dropdown) => {
    if (isClosed(dropdown)) { return; }
    const selected = getSelectedOption(dropdown);
    const input = getInput(dropdown);
    if (selected) {
      input.value = selected.innerText.trim();
      dropdown.dispatchEvent(new CustomEvent('select-dropdown:valid-selection', {
        detail: { input: input },
        bubbles: true
      }));
    }
  };

  const clickOption = (option) => {
    const dropdown = option.closest(api.settings.selectorDropdown);
    const selected = getSelectedOption(dropdown);
    if (selected) {
      selected.classList.remove(api.settings.stateSelected);
    }
    option.classList.add(api.settings.stateSelected);
    returnSelected(dropdown);
  };

  const keyRouting = (dropdown, event) => {
    switch (event.key) {
      case 'Enter':
        returnSelected(dropdown);
        closeDropdown(dropdown);
        event.preventDefault();
        return;

      case 'ArrowUp':
        navigateOptions(dropdown, 'prev');
        openDropdown(dropdown);
        return;

      case 'ArrowDown':
        navigateOptions(dropdown, 'next');
        openDropdown(dropdown);
        return;

      case 'Tab':
        if (isOpened(dropdown)) {
          returnSelected(dropdown);
          closeDropdown(dropdown);
          event.preventDefault();
        }
        return;

      case 'Escape':
        closeDropdown(dropdown);
        event.preventDefault();
        return;

      default:
        return;
    }
  };

  api.maybeOpenDropdown = (el) => {
    const dropdown = el.querySelector(api.settings.selectorDropdown);
    const input = getInput(dropdown);
    if (document.activeElement === input) {
      openDropdown(dropdown);
    }
  };

  api.maybeCloseDropdown = (el) => {
    const dropdown = el.querySelector(api.settings.selectorDropdown);
    const options = getOptions(dropdown);
    if (!options.length) {
      closeDropdown(dropdown);
    }
  };

  api.clickOptionSetup = (options) => {
    api.settings = { ...api.defaults, ...api.settings, ...options };
    if (!api.settings.clickOptionSetup) {
      api.settings.clickOptionSetup = true;
      document.addEventListener('click', (event) => {
        const option = event.target.closest(api.settings.selectorOption);
        if (option) {
          clickOption(option);
        }
      });
    }
  };

  api.register = (el, options) => {
    api.settings = { ...api.defaults, ...api.settings, ...options };
    const dropdown = el.querySelector(api.settings.selectorDropdown);
    const input = getInput(dropdown);
    if (input && input.tagName === 'INPUT') {
      input.addEventListener('click', () => {
        openDropdown(dropdown);
      });
      input.addEventListener('input', () => {
        matchInput(dropdown);
      });
      input.addEventListener('focus', () => {
        openDropdown(dropdown);
      });
      input.addEventListener('blur', (event) => {
        setTimeout(() => {
          if (document.activeElement != event.target) {
            closeDropdown(dropdown);
          }
        }, 200);
      });
      input.addEventListener('keydown', keyRouting.bind(null, dropdown));
    }
  };

  return api;
};
