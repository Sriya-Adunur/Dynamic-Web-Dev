/*import { View } from "@calpoly/mustang";
import { html, css } from "lit";
import { property } from "lit/decorators.js";
import { Model } from "../model";
import { Msg } from "../messages";
import update from "../update";
import reset from "../styles/reset.css.ts";

export class RatingViewElement extends View<Model, Msg> {
  @property({ attribute: "film-id" }) filmId?: string;


  get draft(): { rating: number; comment: string } {
        const saved = localStorage.getItem(`draft-${this.filmId}`);
        return saved ? JSON.parse(saved) : { rating: 0, comment: "" };
      }
  
  get rating() {
    return this.draft.rating;
  }
  
  get comment() {
    return this.draft.comment;
  }
  

  constructor() {
    super("app:model");
  }

  get film() {
    return this.model.selectedFilm;
  }

  attributeChangedCallback(name: string, oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, oldVal, newVal);
    if (name === "film-id" && newVal && oldVal !== newVal) {
      this.dispatchMessage(["film/select", { id: newVal }]);
    }
  }

  async submitReview(e: Event) {
    e.preventDefault();

    // Send manually to API (optional to move into update.ts)
    const auth = this.getAuthUser();
    if (!auth?.token) {
      alert("You must be logged in.");
      return;
    }

    const res = await fetch(`/api/films/${this.filmId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({
          rating: this.rating,
          comment: this.comment
        })
      });
      

    if (res.ok) {
      this.submitted = true;
      this.dispatchMessage(["film/select", { id: this.filmId! }]); // re-fetch
    } else {
      alert("Failed to submit review");
    }
  }

  static styles = [
    reset,
    css`
      :host {
        display: block;
        font-family: "Lato", sans-serif;
        background-color: var(--color-background-page, #f2efe5);
        padding: 2rem;
      }
  
      section {
        max-width: 600px;
        margin: 0 auto;
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        font-family: "Outfit", sans-serif;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
  
      p,
      ul {
        margin-bottom: 1rem;
      }
  
      ul {
        padding-left: 1rem;
      }
  
      label {
        font-weight: bold;
        display: block;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
      }
  
      select,
      textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        margin-bottom: 1rem;
      }
  
      button {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        background-color: var(--color-larger-text, #aa2923);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
  
      button:hover {
        background-color: #881f1a;
      }
  
      .back-link {
        display: block;
        margin-top: 2rem;
        font-weight: bold;
        color: var(--color-larger-text, #aa2923);
        text-decoration: none;
      }
  
      .back-link:hover {
        text-decoration: underline;
      }
  
      h3 {
        margin-top: 2rem;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
  
      .review-list li {
        margin-bottom: 1rem;
      }
    `
  ];
  

render() {
    if (!this.film) return html`<p>Loading film...</p>`;
  
    return html`
      <section>
        <h2>${this.film.title}</h2>
        <p><strong>Plot:</strong> ${this.film.plot}</p>
        <p><strong>Genres:</strong> ${this.film.genres.join(", ")}</p>
        <ul>
          ${this.film.cast.map((c) => html`<li>${c.name} - ${c.role}</li>`)}
        </ul>
  
        <form @submit=${this.submitReview}>
          <label>Your Rating:</label>
          <select 
            .value=${this.rating.toString()}
            @change=${(e: Event) => {
              const val = parseInt((e.target as HTMLSelectElement).value);
              localStorage.setItem(`draft-${this.filmId}`, JSON.stringify({ ...this.draft, rating: val }));
            }}>
            <option value="0">Select</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            <option value="4">⭐️⭐️⭐️⭐️</option>
            <option value="3">⭐️⭐️⭐️</option>
            <option value="2">⭐️⭐️</option>
            <option value="1">⭐️</option>
          </select>
  
          <label>Your Review:</label>
          <textarea
            rows="4"
            .value=${this.comment}
            @input=${(e: Event) => {
              const val = (e.target as HTMLTextAreaElement).value;
              localStorage.setItem(`draft-${this.filmId}`, JSON.stringify({ ...this.draft, comment: val }));
            }}>
          </textarea>
          <button type="submit">Submit Review</button>
        </form>

        ${this.film.reviews?.length
            ? html`
                <h3>Reviews</h3>
                <ul>
                  ${this.film.reviews.map((r) => html`
                    <li><strong>${r.username}</strong> rated ${r.rating}/5<br>${r.comment}</li>
                  `)}
                </ul>
              `
            : html`<p>No reviews yet.</p>`}  
      </section>
    `;
  }
}*/

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

  /*render() {
    if (!this.film) return html`<p>Loading film...</p>`;

    return html`
      <main class="page">
        <h2>Review: ${this.film.title}</h2>
        <section class="review-card">
          <p><strong>Plot:</strong> ${this.film.plot}</p>
          <p><strong>Genres:</strong> ${this.film.genres.join(", ")}</p>
          <ul>
            ${this.film.cast.map((c) => html`<li>${c.name} - ${c.role}</li>`)}
          </ul>

          <mu-form .init=${this.myReview} @mu-form:submit=${this.handleSubmit}>
            <label>Rating
              <select name="rating" required>
                <option value="">Select</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                <option value="4">⭐️⭐️⭐️⭐️</option>
                <option value="3">⭐️⭐️⭐️</option>
                <option value="2">⭐️⭐️</option>
                <option value="1">⭐️</option>
              </select>
            </label>
            <label>Comment
              <textarea
                name="comment"
                rows="4"
                required
              ></textarea>
            </label>
          </mu-form>
        </section>
      </main>
    `;
  }*/

    /*render() {
      if (!this.film) return html`<p>Loading film...</p>`;
    
      return html`
      <section>
          <h2>${this.film.title}</h2>
            <p><strong>Plot:</strong> ${this.film.plot}</p>
            <p><strong>Genres:</strong> ${this.film.genres.join(", ")}</p>
            <ul> <strong>Cast:</strong>
              ${this.film.cast.map((c) => html`<li>${c.name} - ${c.role}</li>`)}
            </ul>
    
            <label>Your Rating:</label>
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
    
              <label>Your Review:</label>
                <textarea name="comment" rows="4" required></textarea>
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
      `;
    }

    static styles = [
      reset,
      css`
      :host {
        display: block;
        font-family: "Lato", sans-serif;
        background-color: var(--color-background-page, #f2efe5);
        padding: 2rem;
      }
         section {
        max-width: 600px;
        margin: 0 auto;
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

         h2 {
        font-family: "Outfit", sans-serif;
        color: var(--color-smaller-text);
        margin-bottom: 1rem;
        font-size: 2rem;
        text-align: left; 
      }
    
        h3 {
           margin-top: 2rem;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        }
    
        label {
        font-weight: bold;
        display: block;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
      }

  
      label,
    select,
    textarea {
      display: block;
      width: 100%;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }


        ul {
          list-style: none;
          padding: 0;
        }

         p {
        margin-bottom: 1rem;
      }
      `
    ];
    
}*/

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

