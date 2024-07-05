import "./src/app.css";
import * as vb from "https://unpkg.com/vrembem@next/dist/index.js";

// Setup local storage proxy.
const store = vb.core.localStore('profile');

// Set the body class.
if (store.get('theme') != 'default') {
  document.documentElement.classList.add('theme-' + store.get('theme'));
}

/**
 * Theme switching functionality.
 */

// Get the form element.
const form = document.querySelector('#user-preference');

// If a local store theme preference exists...
if (store.get('theme')) {
  // Update the form element to the stored value.
  form.querySelector(`select[name="theme"]`).value = store.get('theme');
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

    // If the value isn't default, add the selected theme class.
    if (value != 'default') {
      document.documentElement.classList.add('theme-' + value);
    }

    // Save our preference to the local storage proxy.
    store.set('theme', value);
  }
}

/**
 * Display OS scheme preference.
 */

// Get the current mode element.
const el = document.querySelector('#current-mode');

// Setup the media query list.
const mql = window.matchMedia('(prefers-color-scheme: dark)');

// Initial run of color scheme handler.
handleColorScheme(mql);

// Setup event listener.
mql.addEventListener('change', handleColorScheme);

// Handle color scheme match check.
function handleColorScheme(event) {
  el.innerText = event.matches ? "dark" : "light";
}
