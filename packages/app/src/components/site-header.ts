import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
  private _auth = new Observer<Auth.Model>(this, "app:auth");

  @state() loggedIn = false;
  @state() userid?: string;

  connectedCallback() {
    super.connectedCallback();
    this._auth.observe((auth) => {
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

  handleSignOut() {
    this.dispatchEvent(new CustomEvent("auth:message", {
      bubbles: true,
      composed: true,
      detail: [
        "auth/signout",
      ]
    }));
    location.assign("/login.html");

  }

  toggleDarkMode(e: Event) {
    const checkbox = e.currentTarget as HTMLInputElement;
    const enabled = checkbox.checked;
  
    // Fire event on document.body instead of shadow root
    document.body.dispatchEvent(new CustomEvent("darkmode:toggle", {
      bubbles: true,
      detail: { enabled }
    }));
  }

  render() {
    return html`
      <header class="main-header">
        <div class="left-section">
          ${this.loggedIn
            ? html`<div class="hello-user">Hello, <strong>${this.userid}</strong></div>`
            : null}
          <div class="logo">
            <a href="/app" class="logo-link">
              <h1>
                <svg class="icon" aria-hidden="true">
                  <use href="/icons/movies.svg#icon-glasses" />
                </svg>
                SeenThat
              </h1>
            </a>
          </div>
        </div>

        <div class="right-section">
          <nav class="navbar">
            <ul>
              <li>
                <a href=${this.loggedIn ? `/app/profile/${this.userid}/edit` : "/login.html"}>
                  Profile
                </a>
              </li>
              <li><a href="/recommendations.html">Get Recommendations</a></li>
              <li><a href="#">Search</a></li>
            </ul>
          </nav>

          <div class="user-controls">
            ${this.loggedIn
              ? html`<button @click=${this.handleSignOut}>Sign Out</button>`
              : html`<a @click=${() => location.assign("/login.html")}>Sign In</a>`}

            <label class="darkmode">
              <input
                type="checkbox"
                ?checked=${document.body.classList.contains("dark-mode")}
                @change=${this.toggleDarkMode}
              />
              Dark Mode
            </label>
          </div>
        </div>
      </header>
    `;
  }

  static styles = css`
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--color-header-background);
      color: var(--color-header-text);
      padding: 1rem 2rem;
      flex-wrap: wrap;
      font-family: "Lato", sans-serif;
    }

    .left-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .hello-user {
      font-size: 1rem;
      color: var(--color-header-text);
      font-weight: 500;
    }

    .logo h1 {
      font-size: 1.8rem;
      font-family: "Outfit", sans-serif;
      display: flex;
      align-items: center;
      color: var(--color-accent);
      gap: 0.5rem;
      margin: 0;
    }

    .icon {
      width: 2em;
      height: 1.7em;
      fill: currentColor;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .navbar ul {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .navbar a {
      text-decoration: none;
      color: var(--color-accent);
      font-weight: 500;
    }

    .navbar a:hover {
      text-decoration: underline;
    }

    .user-controls {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
      font-size: 0.95rem;
    }

    .user-controls button {
      background: transparent;
      border: 1px solid var(--color-accent);
      color: var(--color-accent);
      padding: 0.4rem 0.8rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .user-controls button:hover {
      background: var(--color-accent);
      color: var(--color-header-background);
    }

    .darkmode {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--color-accent);
    }
    
    .logo-link {
      text-decoration: none;
      color: inherit;
    }

    .darkmode input[type="checkbox"] {
      accent-color: var(--color-accent);
    }

    @media (max-width: 768px) {
      .main-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .right-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .user-controls {
        align-items: flex-start;
      }

      .left-section {
        align-items: flex-start;
      }
    }
  `;
}

  