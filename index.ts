/// <reference types="vite/client" />

class VrembemChoiceInput extends HTMLElement {
  #initialized = false;
  input!: HTMLInputElement;

  static block = "";
  static type = "checkbox";
  static template = "";
  static modifiers: string[] = ["size"];
  
  protected onInit() {};

  connectedCallback() {
    // Only run this if it hasn't been initialized
    if (this.#initialized) return;
    this.#initialized = true;

    // Get the constructor
    const self = this.constructor as typeof VrembemChoiceInput;

    // Add component class to the host element
    this.classList.add(self.block);

    // Get or create the input element
    this.input = this.querySelector("input") || document.createElement("input");
    this.input.type = self.type;
    this.input.classList.add(`${self.block}__native`);

    // Build wrapper markup and add the input
    this.innerHTML = self.template;

    // Prepend the input
    this.prepend(this.input);

    // Set modifiers
    self.modifiers.forEach((modifier) => {
      if (this.hasAttribute(modifier)) {
        this.classList.add(`${self.block}_${modifier}_${this.getAttribute(modifier)}`);
      }
    });

    // Run init function for any custom setup
    this.onInit();
  }
}

customElements.define("vb-checkbox", class extends VrembemChoiceInput {
  static block = "checkbox";
  static template = `
    <span class="checkbox__background">
      <span class="checkbox__box">
        <span class="checkbox__icon"></span>
      </span>
    </span>
  `;
  protected onInit() {
    this.input.indeterminate = this.input.matches('[aria-checked="mixed"]');
  }
});

customElements.define("vb-radio", class extends VrembemChoiceInput {
  static block = "radio";
  static type = "radio";
  static template = `
    <span class="radio__background">
      <span class="radio__circle">
        <span class="radio__dot"></span>
      </span>
    </span>
  `;
});

customElements.define("vb-switch", class extends VrembemChoiceInput {
  static block = "switch";
  static template = `
    <span class="switch__background">
      <span class="switch__track">
        <span class="switch__thumb"></span>
      </span>
    </span>
  `;
});
