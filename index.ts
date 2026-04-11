/// <reference types="vite/client" />

class CheckboxComponent extends HTMLElement {
  #initialized: boolean = false;
  input!: HTMLInputElement;
  root!: HTMLElement;

  // Declare which host attributes to watch
  static observedAttributes = ["name", "value", "checked", "disabled", "required", "indeterminate", "aria-checked", "size"];

  // Create modifier map
  static modifiers: Record<string, string> = {
    size: "checkbox_size"
  };
  
  private applyModifiers(modifier?: string) {
    if (!modifier) {
      // Loop through the modifiers map and run recursively
      for (const modifier of Object.keys(CheckboxComponent.modifiers)) {
        this.applyModifiers(modifier);
      }
      return;
    }

    // Get the prefix and return if it doesn't exist.
    const prefix = CheckboxComponent.modifiers[modifier];
    if (!prefix) return;

    // Remove the existing modifier if it exists
    this.root.classList.forEach((item) => {
      if (item.startsWith(`${prefix}_`)) this.root.classList.remove(item);
    });

    // Add the modifier provided by the host attribute
    const value = this.getAttribute(modifier);
    if (value) {
      this.root.classList.add(`${prefix}_${value}`);
    }
  }

  connectedCallback() {
    // Check if this element has been initialized
    if (this.#initialized) return;
    this.#initialized = true;

    // Get the input element
    this.input = this.querySelector("input") || document.createElement("input");   
    
    // Ensure that the type attribute and native class are set
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

    // Set the root component element
    this.root = this.querySelector(".checkbox")!;

    // Prepend the input in the markup. We know ".checkbox" will be available 
    // because we inject it just above.
    this.root.prepend(this.input);

    // Sync host attributes to the input on init
    for (const attr of CheckboxComponent.observedAttributes) {
      if (this.hasAttribute(attr)) {
        // Skip modifier attributes
        if (attr in CheckboxComponent.modifiers) continue;
        // We need to set indeterminate differently than other attributes
        if (attr === "indeterminate") {
          this.input.indeterminate = true;
          continue;
        }
        // Apply the rest of the attributes directly to input
        this.input.setAttribute(attr, this.getAttribute(attr) || "");
      }
    }

    // Get checkboxes with "mixed" status
    if (this.input.matches("[aria-checked='mixed']")) {
      this.input.indeterminate = true;
    }

    // Apply provided modifiers to the root checkbox element
    const modifiers = this.getAttribute("modifiers");
    if (modifiers) {
      this.root.classList.add(...modifiers.split(/\s+/));
    }

    // Apply modifier attribute maps to the root checkbox element
    this.applyModifiers();
  }

  // React to host attribute changes at any time
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
    // Guard in case input hasn't been set yet
    if (!this.input) return;

    // Check if the checkbox is rendered
    if (!this.root) return;

    // Apply the modifiers if the attribute was passed
    if (name in CheckboxComponent.modifiers) {
      this.applyModifiers(name);
      return;
    }

    // We need to set indeterminate differently than other attributes
    if (name === "indeterminate") {
      this.input.indeterminate = newValue !== null;
      return;
    }

    // Update or remove the attribute value
    if (newValue === null) {
      this.input.removeAttribute(name);
    } else {
      this.input.setAttribute(name, newValue);
    }
  }
}

customElements.define("vb-checkbox", CheckboxComponent);
