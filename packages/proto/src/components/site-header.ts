import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "auth");

  @state() loggedIn = false;
  @state() userid?: string;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth) => {
      const { user } = auth;
      if (user?.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  renderSignOutButton() {
    return html`
      <button
        @click=${(_e: Event) =>
          this.dispatchEvent(
            new CustomEvent("auth:message", {
              bubbles: true,
              composed: true,
              detail: ["auth/signout"]
            })
          )}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInLink() {
    return html`<a href="/login.html">Sign In…</a>`;
  }

  render() {
    return html`
      <header>
        <span>Hello, ${this.userid || "User"}</span>
        ${this.loggedIn
          ? this.renderSignOutButton()
          : this.renderSignInLink()}
      </header>
    `;
  }

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
  `;
}
