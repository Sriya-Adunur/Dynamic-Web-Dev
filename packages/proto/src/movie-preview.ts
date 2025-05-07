import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

export class MoviePreviewElement extends LitElement {
    @property({ attribute: "img-src" })
    imgSrc?: string;

    @property()
    href?: string;
  
    override render() {
        return html`
          <a href=${this.href}>
            ${this.imgSrc
              ? html`<img src=${this.imgSrc} alt="" />`
              : html`<slot name="title">Untitled</slot>`}
          </a>
        `;
      }
    
    static styles = [ 
        reset.styles,
        css`
    :host {
      display: block;
      background: var(--color-header-background);
      padding: 0rem;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }

    a {
      display: block;
      margin: 0;
      padding: 0;
      text-decoration: none;
      color: inherit;
    }

    img {
      width: 198px;
      height: 300px;
      border-radius: 8px;
      object-fit: cover;
      display: block;
    }

    ::slotted(*) {
      text-align: center;
      margin-top: 0.5rem;
      display: block;
      font-family: "Outfit", sans-serif;
    }
  `];
}

