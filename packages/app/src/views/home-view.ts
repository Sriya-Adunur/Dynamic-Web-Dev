import { View } from "@calpoly/mustang";
import { html, css } from "lit";
import update from "../update";
import { init } from "./model";
import { Model } from "../model";
import { Msg } from "../messages";
import reset from "../styles/reset.css.ts";

export class HomeViewElement extends View<Model, Msg> {
  constructor() {
    super("app:model");
  }

  connectedCallback() {
    super.connectedCallback();
    this.dispatchMessage(["films/load", {}]);
  }

  get films() {
    return this.model.films ?? [];
  }

  render() {
    return html`
      <section class="movie-list">
        ${this.films.map(
          (film) => html`
            <a href="/app/film/${film._id}/rate" class="movie-tile">
              <img src=${film.filmImage} alt=${film.title} />
            </a>
          `
        )}
      </section>
    `;
  }

  static styles = [
    reset,
    css`
      :host {
        display: block;
        padding: 1rem;
      }

      .movie-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: flex-start;
      }

      .movie-tile {
        display: block;
        width: 198px;
        background: var(--color-header-background);
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        text-decoration: none;
      }

      .movie-tile img {
        width: 100%;
        height: 300px;
        border-radius: 8px;
        object-fit: cover;
        display: block;
      }
    `
  ];
}

