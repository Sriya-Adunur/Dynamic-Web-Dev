// src/messages.ts
import { Profile } from "./model";

export type Msg =
  | ["films/load", {}]
  | ["film/select", { id: string }]
  | ["reviews/load", { userid: string }]
  | ["review/draft", { filmId: string; rating?: number; comment?: string }]
  | ["profile/select", { userid: string }]
  | ["profile/save", {
      userid: string;
      profile: Profile;
      onSuccess?: () => void;
      onFailure?: (err: Error) => void;
    }];

