/*import { View, define, Form, History } from "@calpoly/mustang";
import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { Model, Profile } from "../model";
import { Msg } from "../messages";

export class ProfileEditElement extends View<Model, Msg> {
  constructor() {
        super("app:model");
      }

  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "userid" })
  userid?: string;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["profile/select", { userid: this.userid! }]);
  }

  get profile(): Profile | undefined {
    return this.model.profile;
  }

  handleSubmit(e: Form.SubmitEvent<Profile>) {
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid!,
        profile: e.detail,
        onSuccess: () => History.dispatch(this, "history/navigate", {
          href: `/app/profile/${this.userid}`
        }),
        onFailure: (err) => console.error("Save failed", err)
      }
    ]);
  }

        render() {
            return html`
              <main class="page">
                <h2>Edit Profile</h2>
                <mu-form
                  .init=${this.profile}
                  @mu-form:submit=${this.handleSubmit}>
                   <label>Username
                    <input name="userid" .value=${this.userid ?? ""} readonly />
                 </label>
                  <label>Name
                    <input name="name" .value=${this.profile?.name ?? ""} />
                  </label>
                  <label>City
                    <input name="city" .value=${this.profile?.city ?? ""} />
                  </label>
                  <label>State
                    <input name="state" .value=${this.profile?.state ?? ""} />
                  </label>
                  
                </mu-form>
              </main>
            `;
          } 
}*/

import { View, define, Form, History } from "@calpoly/mustang";
import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { Model, Profile } from "../model";
import { Msg } from "../messages";

export class ProfileEditElement extends View<Model, Msg> {
  constructor() {
    super("app:model");
  }

  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "userid" })
  userid?: string;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["profile/select", { userid: this.userid! }]);
  }

  get profile(): Profile | undefined {
    return this.model.profile;
  }

  handleSubmit(e: Form.SubmitEvent<Profile>) {
    this.dispatchMessage([
      "profile/save",
      {
        userid: this.userid!,
        profile: e.detail,
        onSuccess: () => History.dispatch(this, "history/navigate", {
          href: `/app/profile/${this.userid}`
        }),
        onFailure: (err) => console.error("Save failed", err)
      }
    ]);
  }

  render() {
    return html`
      <main class="page">
        <h2>Edit Profile</h2>
        <section class="profile-card">
          <mu-form
            .init=${this.profile}
            @mu-form:submit=${this.handleSubmit}
          >
            <label>Username
              <input name="userid" .value=${this.userid ?? ""} readonly />
            </label>

            <label>Name
              <input name="name" .value=${this.profile?.name ?? ""} />
            </label>

            <label>City
              <input name="city" .value=${this.profile?.city ?? ""} />
            </label>

            <label>State
              <input name="state" .value=${this.profile?.state ?? ""} />
            </label>

          </mu-form>
        </section>
      </main>
    `;
  }

  static styles = css`
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  h2 {
    font-family: "Outfit", sans-serif;
    color: var(--color-smaller-text);
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: center;
  }

  .profile-card {
    background: var(--color-header-background);
    padding: 2.5rem;
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: var(--color-header-text);
    margin: 0 auto;
    justify-content: center;
  }

  mu-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 100%;
     justify-content: center;
  }

  mu-form label {
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-accent);
    width: 100%;
     justify-content: center;
  }

  mu-form input {
    margin-top: 0.5rem;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    border: none;
    font-size: 1.1rem;
    width: 100%;
     justify-content: center;
  }

  mu-form input[readonly] {
    background: #ccc;
    color: #444;
  }

  mu-form button[slot="submit"] {
    background-color: var(--color-accent);
    color: var(--color-header-background);
    font-weight: bold;
    border: none;
    padding: 0.85rem;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    width: 100%;
    transition: background 0.3s;
  }

  mu-form button[slot="submit"]:hover {
    background-color: #c43730;
  }

  @media (max-width: 600px) {
    .profile-card {
      padding: 1.5rem;
    }
  }
`;

}

