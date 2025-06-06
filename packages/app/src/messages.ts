/*// src/messages.ts
import { Profile } from "./model";

export type Msg =
  | ["films/load", {}]
  | ["film/select", { id: string }]
  | ["reviews/load", { userid: string }]
  | ["review/save", {
    filmId: string;
    review: { rating: number; comment: string };
    onSuccess?: () => void;
    onFailure?: (err: Error) => void;
  }]
  | ["profile/select", { userid: string }]
  | ["profile/save", {
      userid: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }];
*/
export type Msg =
  | ["films/load", {}]
  | ["film/select", { id: string }]
  | ["review/save", {
      filmId: string;
      review: { rating: number; comment: string };
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }]
  | ["profile/select", { userid: string }]
  | ["profile/save", {
      userid: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }]
  | ["reviews/load", { userid: string }];
