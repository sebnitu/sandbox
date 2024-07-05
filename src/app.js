import * as vrembem from "https://unpkg.com/vrembem@next/dist/index.js";

/**
 * Drawer script setup
 */

const drawer = new vrembem.Drawer();

drawer.mount().then((result) => {
  console.log('VB:Drawer => ', result);
});

/**
 * Theme switching functionality.
 */

// Get the form element.
const form = document.querySelector('#user-preference');
if (form) {
  // Setup local storage proxy.
  const store = vrembem.core.localStore('profile');

  // If a local store theme preference exists...
  if (store.theme) {
    // Update the form element to the stored value.
    form.querySelector(`select[name="theme"]`).value = store.theme;
  }

  // Initial theme handler run.
  handleThemePreference(form);

  // Run theme handler whenever form inputs change.
  form.addEventListener('change', (event) => {
    handleThemePreference(form);
  });

  // Handle theme preference.
  function handleThemePreference(form) {
    // Get the theme value from the form data.
    const value = new FormData(form).get('theme');

    // If a theme value is set...
    if (value) {
      // Remove existing theme classes.
      document.documentElement.classList.remove('theme-light', 'theme-dark');

      // If the value isnt default, add the selected theme class.
      if (value != 'default') {
        document.documentElement.classList.add('theme-' + value);
      }

      // Save our preference to the local storage proxy.
      store.theme = value;
    }
  }
}
