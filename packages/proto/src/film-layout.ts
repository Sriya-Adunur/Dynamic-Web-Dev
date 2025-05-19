import { html, css, LitElement } from "lit";
import { Observer } from "@calpoly/mustang";
import { Auth } from "@calpoly/mustang";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

interface Film {
  filmImage: string;
  ratingLink: string;
}

export class FilmElement extends LitElement {
  @property() src?: string;
  @state() films: Array<Film> = [];

  _authObserver = new Observer<Auth.Model>(this, "auth");
  _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();

    // Observe <mu-auth> for a logged-in user
    this._authObserver.observe((auth) => {
      this._user = auth.user;
      if (this.src) {
        this.hydrate(this.src);
      }
    });
  }

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${this._user.token}`
      }
    );
  }

  async hydrate(src: string) {
    try {
      const res = await fetch(src, { headers: this.authorization });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Film[];
      this.films = data;
    } catch (err) {
      console.error("Failed to fetch films:", err);
      this.films = [];
    }
  }

  renderFilm(film: Film) {
    return html`
      <movie-preview
        img-src=${film.filmImage}
        href=${film.ratingLink}
      ></movie-preview>
    `;
  }

  render() {
    return html`
      <section class="movie-list">
        ${this.films.map(this.renderFilm)}
      </section>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
      }

      .movie-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: flex-start;
      }
    `
  ];
}