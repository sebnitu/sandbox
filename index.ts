/// <reference types="vite/client" />

// TODO:
// - Allow passing props (attr) via the root custom element wrapper that get
//   would automatically get applied to the input.
// - Allow setting modifier classes via custom element props (attr)

class CheckboxComponent extends HTMLElement {
  input!: HTMLInputElement;

  connectedCallback() {
    // Check if this element has been initialized
    // TODO: test if this is necessary
    if (this.querySelector(".checkbox")) return;

    // Get the input element
    this.input = this.querySelector("input") || document.createElement("input");   
    
    // Apply the required attribute and class
    this.input.setAttribute("type", "checkbox");
    this.input.classList.add("checkbox__native");

    // Insert the checkbox markup
    this.innerHTML = `
      <span class="checkbox">
        <span class="checkbox__background">
          <span class="checkbox__box">
            <span class="checkbox__icon"></span>
          </span>
        </span>
      </span>
    `;

    // Prepend the input in the markup. We know ".checkbox" will be available 
    // because we inject it just above.
    this.querySelector(".checkbox")!.prepend(this.input);

    // Get checkboxes with "mixed" status
    this.input.indeterminate = this.input.matches("[aria-checked='mixed']");
  }
}

customElements.define("vb-checkbox", CheckboxComponent);
