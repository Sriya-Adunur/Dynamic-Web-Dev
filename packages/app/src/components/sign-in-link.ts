import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("sign-in-link")
export class SignInLink extends LitElement {
  static styles = css`
    a {
      font-size: 1.1rem;
      color: var(--color-larger-text);
      cursor: pointer;
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <a @click=${() => location.assign("/login.html")}>Sign In</a>
    `;
  }
}
