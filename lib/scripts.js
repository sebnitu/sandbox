(function () {
  console.log('Overlay app mounted...');

  const key = window['OverlayObject'];
  const queue = window[key].q;
  console.log({ queue });

  const iframeSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51175.975105524674!2d-122.26806338181783!3d38.116602128149836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80850cce858a7265%3A0x49892e4325e9ede4!2sSix%20Flags%20Discovery%20Kingdom!5e0!3m2!1sen!2sus!4v1597351873210!5m2!1sen!2sus';

  const init = function () {
    injectStyles();
    injectButton('#overlay-button');
    injectStructure('body');
    injectFrame('#overlay-wrapper');
  }

  const injectStyles = function () {
    const styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = './lib/styles.css';
    const ref = document.getElementsByTagName('link')[0];
    ref.parentNode.insertBefore(styles, ref);
  }

  const injectButton = function (location) {
    console.log('Inject button...');
    const button = document.createElement('button');
    button.classList.add('overlay-button', 'button', 'button_color_primary');
    button.innerText = 'Buy Now!';
    document.querySelector(location).append(button);
    button.addEventListener('click', (event) => {
      openOverlay();
      event.preventDefault
    });
  };

  const injectStructure = function (location) {
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
      closeOverlay();
    });

    button.addEventListener('click', () => {
      closeOverlay();
      event.preventDefault
    });

    wrapper.append(screen);
    wrapper.append(loader);
    wrapper.append(button);

    this.wrapper = wrapper;

    closeOverlay();

    document.querySelector(location).append(wrapper);
  };

  const injectFrame = function (location) {
    const iframe = document.createElement('iframe');
    iframe.id = 'overlay-iframe';
    iframe.title = 'Overlay Iframe';
    iframe.src = iframeSrc;
    iframe.frameBorder = 0;
    document.querySelector(location).append(iframe);
  };

  const openOverlay = function () {
    this.wrapper.classList.remove('is-closed');
    this.wrapper.classList.add('is-opened');
  };

  const closeOverlay = function () {
    this.wrapper.classList.remove('is-opened');
    this.wrapper.classList.add('is-closed');
  };

  init();

}());
