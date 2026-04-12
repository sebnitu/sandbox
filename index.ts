/// <reference types="vite/client" />

class CheckboxComponent extends HTMLElement {
  #initialized = false;
  input!: HTMLInputElement;
  root!: HTMLElement;

  static modifiers = {
    size: "checkbox_size_"
  }

  connectedCallback() {
    // Only run this if it hasn't been initialized
    if (this.#initialized) return;
    this.#initialized = true;

    // Get or create the input element
    this.input = this.querySelector("input") || document.createElement("input");
    this.input.type = "checkbox";
    this.input.classList.add("checkbox__native");

    // Build wrapper markup and add the input
    this.innerHTML = `
      <span class="checkbox">
        <span class="checkbox__background">
          <span class="checkbox__box">
            <span class="checkbox__icon"></span>
          </span>
        </span>
      </span>
    `;

    // Prepend the input
    this.root = this.querySelector(".checkbox")!;
    this.root.prepend(this.input);

    // Maybe set the indeterminate state
    this.input.indeterminate = this.input.matches('[aria-checked="mixed"]');

    // Set modifiers
    for (const [modifier, prefix] of Object.entries(CheckboxComponent.modifiers)) {
      if (this.hasAttribute(modifier)) {
        this.root.classList.add(`${prefix}${this.getAttribute(modifier)}`);
      }
    }
  }
}

customElements.define("vb-checkbox", CheckboxComponent);
