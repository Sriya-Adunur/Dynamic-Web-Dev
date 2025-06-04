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
                <mu-form
                  .init=${this.profile}
                  @mu-form:submit=${this.handleSubmit}>
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
}
