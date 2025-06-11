import { View, define, Form, Observer, Auth } from "@calpoly/mustang";
import { html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Model, Review } from "../model";
import { Msg } from "../messages";
import reset from "../styles/reset.css.ts";

export class RatingViewElement extends View<Model, Msg> {
  constructor() {
    super("app:model");
  }

  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "film-id" }) filmId?: string;
  @state()
  private _userid: string = "";

  private _authObserver = new Observer<Auth.Model>(this, "app:auth");

  get film() {
    return this.model.selectedFilm;
  }

  get myReview() {
    return this.film?.reviews?.find((r) => r.username === this._userid);
  }

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth) => {
      if (auth?.user?.authenticated) {
        this._userid = auth.user.username;
      }
    });

    if (this.filmId) {
      this.dispatchMessage(["film/select", { id: this.filmId }]);
    }
  }

  handleSubmit(e: Form.SubmitEvent<{ rating: number; comment: string }>) {
    if (!this._userid) return;
    console.log("user", this._userid)


    const review: Review = {
      username: this._userid,
      rating: Number(e.detail.rating),
      comment: e.detail.comment,
      date: new Date().toISOString()
    };

    this.dispatchMessage([
      "review/save",
      {
        filmId: this.filmId!,
        review,
        onSuccess: () => this.dispatchMessage(["film/select", { id: this.filmId! }]),
        onFailure: (err) => console.error("Review save failed", err)
      }
    ]);
  }

render() {
  if (!this.film) return html`<p>Loading film...</p>`;

  return html`
    <main class="page">
      <h2>${this.film.title}</h2>
      <section class="review-card">
        <p><strong>Plot:</strong> ${this.film.plot}</p>
        <p><strong>Genres:</strong> ${this.film.genres.join(", ")}</p>
        <ul>
          <strong>Cast:</strong>${this.film.cast.map((c) => html`<li>${c.name} - ${c.role}</li>`)}
        </ul>

        <h3>Your Rating:</h3>
        <mu-form .init=${this.myReview} @mu-form:submit=${this.handleSubmit}>
          <label>
            <select name="rating" required>
              <option value="">Select</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="1">⭐️</option>
            </select>
          </label>

          <h3>Your Review:</h3>
          <label>
            <textarea name="comment" rows="4" required></textarea>
          </label>

        </mu-form>

        <h3>Reviews</h3>
        <ul>
          ${this.film.reviews.map(
            (r) => html`
              <li>
                <strong>${r.username}</strong> rated ${r.rating}/5<br />
                ${r.comment}
              </li>
            `
          )}
        </ul>
      </section>
    </main>
    `;
    }
  
  static styles = [
    reset,
    css`
      .page {
        padding: 2rem;
        font-family: "Lato", sans-serif;
        max-width: 600px;
        margin: auto;
        background: #fff;
        border-radius: 0.75rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
  
      h3 {
        margin-top: 1.5rem;
        font-size: 1.2rem;
      }

      p {
      margin-bottom: 1rem;
       }
  
      label,
      select,
      textarea {
        display: block;
        width: 100%;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }
  
      select,
      textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        font-size: 1rem;
      }
  
      button[type="submit"] {
        padding: 0.6rem 1.2rem;
        background: #a22;
        color: white;
        border: none;
        border-radius: 0.3rem;
        cursor: pointer;
        font-weight: bold;
      }
  
      ul {
        list-style: none;
        padding: 0;
      }

    `
  ];  
}

