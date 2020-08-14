export const openTransition = function (modal, settings) {
  return new Promise((resolve) => {
    if (settings.transition) {
      modal.classList.remove(settings.stateClosed);
      modal.classList.add(settings.stateOpening);
      modal.addEventListener('transitionend', function _f() {
        modal.classList.add(settings.stateOpened);
        modal.classList.remove(settings.stateOpening);
        resolve(modal);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      modal.classList.add(settings.stateOpened);
      modal.classList.remove(settings.stateClosed);
      resolve(modal);
    }
  });
}

export const closeTransition = function (modal, settings) {
  return new Promise((resolve) => {
    if (settings.transition) {
      modal.classList.add(settings.stateClosing);
      modal.classList.remove(settings.stateOpened);
      modal.addEventListener('transitionend', function _f() {
        modal.classList.remove(settings.stateClosing);
        modal.classList.add(settings.stateClosed);
        resolve(modal);
        this.removeEventListener('transitionend', _f);
      });
    } else {
      modal.classList.add(settings.stateClosed);
      modal.classList.remove(settings.stateOpened);
      resolve(modal);
    }
  });
}
