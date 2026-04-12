/// <reference types="vite/client" />

// Lines
// ---
// Individual: 132
// Shared Class: 

class VrembemChoice extends HTMLElement {

}

class CheckboxComponent extends HTMLElement {
  #initialized = false;
  input!: HTMLInputElement;

  static modifiers = {
    size: "checkbox_size_"
  }

  connectedCallback() {
    // Only run this if it hasn't been initialized
    if (this.#initialized) return;
    this.#initialized = true;

    // Add component class to the host element
    this.classList.add("checkbox");

    // Get or create the input element
    this.input = this.querySelector("input") || document.createElement("input");
    this.input.type = "checkbox";
    this.input.classList.add("checkbox__native");

    // Build wrapper markup and add the input
    this.innerHTML = `
      <span class="checkbox__background">
        <span class="checkbox__box">
          <span class="checkbox__icon"></span>
        </span>
      </span>
    `;

    // Prepend the input
    this.prepend(this.input);

    // Maybe set the indeterminate state
    this.input.indeterminate = this.input.matches('[aria-checked="mixed"]');

    // Set modifiers
    for (const [modifier, prefix] of Object.entries(CheckboxComponent.modifiers)) {
      if (this.hasAttribute(modifier)) {
        this.classList.add(`${prefix}${this.getAttribute(modifier)}`);
      }
    }
  }
}

class RadioComponent extends HTMLElement {
  #initialized = false;
  input!: HTMLInputElement;

  static modifiers = {
    size: "radio_size_"
  }

  connectedCallback() {
    // Only run this if it hasn't been initialized
    if (this.#initialized) return;
    this.#initialized = true;

    // Add component class to the host element
    this.classList.add("radio");

    // Get or create the input element
    this.input = this.querySelector("input") || document.createElement("input");
    this.input.type = "radio";
    this.input.classList.add("radio__native");

    // Build wrapper markup and add the input
    this.innerHTML = `
      <span class="radio__background">
        <span class="radio__circle">
          <span class="radio__dot"></span>
        </span>
      </span>
    `;

    // Prepend the input
    this.prepend(this.input);

    // Set modifiers
    for (const [modifier, prefix] of Object.entries(CheckboxComponent.modifiers)) {
      if (this.hasAttribute(modifier)) {
        this.classList.add(`${prefix}${this.getAttribute(modifier)}`);
      }
    }
  }
}

class SwitchComponent extends HTMLElement {
  #initialized = false;
  input!: HTMLInputElement;

  static modifiers = {
    size: "switch_size_"
  }

  connectedCallback() {
    // Only run this if it hasn't been initialized
    if (this.#initialized) return;
    this.#initialized = true;

    // Add component class to the host element
    this.classList.add("switch");

    // Get or create the input element
    this.input = this.querySelector("input") || document.createElement("input");
    this.input.type = "checkbox";
    this.input.classList.add("switch__native");

    // Build wrapper markup and add the input
    this.innerHTML = `
      <span class="switch__background">
        <span class="switch__track">
          <span class="switch__thumb"></span>
        </span>
      </span>
    `;

    // Prepend the input
    this.prepend(this.input);

    // Set modifiers
    for (const [modifier, prefix] of Object.entries(CheckboxComponent.modifiers)) {
      if (this.hasAttribute(modifier)) {
        this.classList.add(`${prefix}${this.getAttribute(modifier)}`);
      }
    }
  }
}

customElements.define("vb-checkbox", CheckboxComponent);
customElements.define("vb-radio", RadioComponent);
customElements.define("vb-switch", SwitchComponent);
