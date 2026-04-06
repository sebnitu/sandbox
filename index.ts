/// <reference types="vite/client" />

import resetStyles from "@vrembem/core/reset?inline";
import cardStyles from "@vrembem/card/dist/index.css?inline";

const reset = new CSSStyleSheet();
reset.replaceSync(resetStyles);

const sheet = new CSSStyleSheet();
sheet.replaceSync(cardStyles);

class CardComponent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.adoptedStyleSheets = [reset, sheet];
    shadow.innerHTML = `
      <style>:host { display: block; background: transparent; }</style>
      <div class="card">
        <div class="card__header">
          <slot name="title"></slot>
        </div>
        <div class="card__body">
          <slot></slot>
        </div>
        <div class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;

    // Hide wrappers when slots are empty
    shadow.querySelectorAll("slot").forEach((slot) => {
      slot.addEventListener("slotchange", () => {
        const wrapper = slot.parentElement;
        if (wrapper) {
          wrapper.hidden = slot.assignedNodes().length === 0;
        }
      });
    });
  }

  connectedCallback() {
    // Initial check for named slots
    this.shadowRoot?.querySelectorAll<HTMLSlotElement>("slot[name]").forEach((slot) => {
      const wrapper = slot.parentElement;
      if (wrapper) {
        wrapper.hidden = slot.assignedNodes().length === 0;
      }
    });
  }
}

customElements.define("vb-card", CardComponent);
