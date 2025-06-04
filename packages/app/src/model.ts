// src/model.ts
import { Film, Review, Profile } from "server/models";

export interface ReviewDraft {
    filmId: string;
    rating: number;
    comment: string;
  }

export interface Model {
  profile?: Profile;
  films?: Film[];
  selectedFilm?: Film;
  myReviews?: Review[];
  reviewDrafts: Record<string, ReviewDraft>;
}

/*export const init: Model = {};*/
export const init: Model = {
    reviewDrafts: {}
  };
