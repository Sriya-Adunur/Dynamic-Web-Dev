import { Film, Review, Profile } from "server/models";
import { AuthenticatedUser } from "@calpoly/mustang";

export interface Model {
    profile?: Profile;
    films?: Film[];
    selectedFilm?: Film;
  }

export const init: Model = {};
