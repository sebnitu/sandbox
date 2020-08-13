(function () {

  class OverlayApp {
    constructor() {
      this.settings = {
        stateOpened: 'is-opened',
        stateOpening: 'is-opening',
        stateClosing: 'is-closing',
        stateClosed: 'is-closed',
        transition: true
      }
      this.working = false;
      this.key = window['OverlayObject'];
      this.queue = window[this.key].q;
      this.iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51175.975105524674!2d-122.26806338181783!3d38.116602128149836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80850cce858a7265%3A0x49892e4325e9ede4!2sSix%20Flags%20Discovery%20Kingdom!5e0!3m2!1sen!2sus!4v1597351873210!5m2!1sen!2sus';
      this.init();
    }

    init() {
      this.injectStyles();
      this.injectButton('#overlay-button');
      this.injectStructure('body');
      this.injectFrame('#overlay-wrapper');
    }

    injectStyles() {
      const styles = document.createElement('link');
      styles.rel = 'stylesheet';
      styles.href = './lib/styles.css';
      const ref = document.getElementsByTagName('link')[0];
      ref.parentNode.insertBefore(styles, ref);
    }

    injectButton(location) {
      const button = document.createElement('button');
      button.classList.add('overlay-button', 'button', 'button_color_primary');
      button.innerText = 'Buy Now!';
      document.querySelector(location).append(button);
      button.addEventListener('click', (event) => {
        if (this.working) return;
        this.openOverlay();
        event.preventDefault
      });
    }

    injectStructure(location) {
      const wrapper = document.createElement('div');
      const screen = document.createElement('div');
      const loader = document.createElement('div');
      const button = document.createElement('button');

      wrapper.id = 'overlay-wrapper';
      screen.id = 'overlay-screen';
      loader.id = 'overlay-loader';
      button.id = 'overlay-close-button';

      button.innerText = 'Close overlay';
      button.classList.add('button', 'button_color_secondary');

      screen.addEventListener('click', () => {
        if (this.working) return;
        this.closeOverlay();
      });

      button.addEventListener('click', (event) => {
        if (this.working) return;
        this.closeOverlay();
        event.preventDefault
      });

      wrapper.append(screen);
      wrapper.append(loader);
      wrapper.append(button);

      this.wrapper = wrapper;

      this.closeOverlay();

      document.querySelector(location).append(wrapper);
    }

    injectFrame(location) {
      const iframe = document.createElement('iframe');
      iframe.id = 'overlay-iframe';
      iframe.title = 'Overlay Iframe';
      iframe.src = this.iframeSrc;
      iframe.frameBorder = 0;
      document.querySelector(location).append(iframe);
    }

    async openOverlay() {
      this.working = true;
      await this.openTransition(this.wrapper, this.settings);
      this.working = false;
    }

    async closeOverlay() {
      this.working = true;
      await this.closeTransition(this.wrapper, this.settings);
      this.working = false;
    }

    openTransition(modal, settings) {
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

    closeTransition(modal, settings) {
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
    };
  }

  new OverlayApp;

}());
