import { html, css, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import reset from "./styles/reset.css.ts";

interface Film {
    filmImage: string;
    ratingLink: string;
  }
  
export class FilmElement extends LitElement {
  @property()
  src?: string;

  @state() films: Array<Film> = [];


  connectedCallback() {
    super.connectedCallback();
    if (this.src) {
      this.hydrate(this.src);
    }
  }

  hydrate(src: string) {
    fetch(src)
      .then((res) => res.json())
      .then((json: object) => {
        if (json) {
          const data = json as Film[];
          this.films = data;
        }
      });
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