import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "../styles/reset.css";

interface LoginFormData {
  username?: string;
  password?: string;
}

export class LoginFormElement extends LitElement {

  @state()
  formData: LoginFormData = {};

  @property()
  api?: string;

  @property()
  redirect: string = "/";

  @state()
  error?: string;

  get canSubmit(): boolean {
    return Boolean(this.api && this.formData.username &&
      this.formData.password);
  }

  override render() {
    return html`
      <form
        @change=${(e: InputEvent) => this.handleChange(e)}
        @submit=${(e: SubmitEvent) => this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `;
  }

  static styles = [
    reset,
    css`
      :host {
      font-family: "Outfit", sans-serif;
      color: var(--color-text);
      background-color: var(--color-background, #fff);
    }

       h2 {
        font-family: "Outfit", sans-serif;
      }

      form {
        font-family: "Outfit", sans-serif;
        display: flex;
        flex-direction: column;
        gap: var(--size-spacing-medium, 1rem);
        padding: var(--size-spacing-large, 2rem);
        border: 1px solid var(--color-border, #ccc);
        border-radius: var(--size-radius-medium, 8px);
        background-color: var(--color-background, #fff);
        max-width: 400px;
        margin: auto;
      }
  
      ::slotted(input) {
        font-family: "Outfit", sans-serif;
        padding: var(--size-spacing-small, 0.75rem);
        font-size: 1rem;
        border: 1px solid var(--color-border, #ccc);
        border-radius: var(--size-radius-small, 4px);
        width: 100%;
      }
  
      ::slotted(button), button {
        ont-family: "Outfit", sans-serif;
        padding: var(--size-spacing-small, 0.75rem);
        font-size: 1rem;
        background-color: var(--color-primary, #3B5441);
        color: white;
        border: none;
        border-radius: var(--size-radius-small, 4px);
        cursor: pointer;
        transition: background-color 0.3s;
      }
     
  
      .error:not(:empty) {
        font-family: "Outfit", sans-serif;
        color: var(--color-error, red);
        border: 1px solid var(--color-error, red);
        background: var(--color-error-bg, #ffe5e5);
        padding: var(--size-spacing-medium, 1rem);
        border-radius: var(--size-radius-small, 4px);
        font-size: 0.95rem;
      }
    `
  ];
  

  handleChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const name = target?.name;
    const value = target?.value;
    const prevData = this.formData;
  
    switch (name) {
      case "username":
        this.formData = { ...prevData, username: value };
        break;
      case "password":
        this.formData = { ...prevData, password: value };
        break;
    }
  }

  handleSubmit(submitEvent: SubmitEvent) {
    submitEvent.preventDefault();

    if (this.canSubmit) {
      fetch(
        this?.api || "",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(this.formData)
        }
      )
      .then((res) => {
        if (res.status !== 200 && res.status !== 201)
          throw "Login failed";
        else return res.json();
      })
      .then((json: object) => {
          const { token } = json as { token: string };
          const customEvent = new CustomEvent(
          'auth:message', {
          bubbles: true,
          composed: true,
          detail: [
              'auth/signin',
              { token, ussername: this.formData.username, 
                redirect: this.redirect }
          ]
          });
          console.log("dispatching message", customEvent);
          this.dispatchEvent(customEvent);
      })
      .catch((error: Error) => {
          console.log(error);
          this.error = error.toString();
      });
    }
  }

}