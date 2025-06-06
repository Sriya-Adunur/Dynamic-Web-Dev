/*import { Msg } from "./messages";
import { Model } from "./model";
import { Auth, Update } from "@calpoly/mustang";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "film/select":
      return fetch(`/api/films/${message[1].id}`, {
        headers: Auth.headers(user)
      })
        .then((res) => res.json())
        .then((film) => apply((model) => ({ ...model, selectedFilm: film })));
    case "films/load":
            return fetch("/api/films", {
              headers: Auth.headers(user)
            })
              .then(res => res.json())
              .then((films) => apply((model) => ({ ...model, films })));
    case "review/draft": {
                const { filmId, rating, comment } = message[1];
                return apply((model) => ({
                  ...model,
                  reviewDrafts: {
                    ...model.reviewDrafts,
                    [filmId]: {
                      filmId,
                      rating: rating ?? model.reviewDrafts[filmId]?.rating ?? 0,
                      comment: comment ?? model.reviewDrafts[filmId]?.comment ?? ""
                    }
                  }
                }));
              }
    case "review/save": {
                const { filmId, review, onSuccess, onFailure } = message[1];
                return fetch(`/api/films/${filmId}/review`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    ...Auth.headers(user)
                  },
                  body: JSON.stringify(review)
                })
                  .then((res) => {
                    if (!res.ok) throw new Error("Failed to save review");
                    return res.json();
                  })
                  .then(() => {
                    if (onSuccess) onSuccess();
                  })
                  .catch((err) => {
                    if (onFailure) onFailure(err);
                  });
              }              
    case "profile/select":
                return fetch(`/api/profile/${message[1].userid}`, {
                  headers: Auth.headers(user)
                })
                  .then(res => res.json())
                  .then(profile => apply((model) => ({ ...model, profile })));
              
    case "profile/save":
                return fetch(`/api/profile/${message[1].userid}`, {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    ...Auth.headers(user)
                  },
                  body: JSON.stringify(message[1].profile)
                })
                  .then(res => res.json())
                  .then(profile => {
                    apply((model) => ({ ...model, profile }));
                    if (message[1].onSuccess) message[1].onSuccess();
                  })
                  .catch(err => {
                    if (message[1].onFailure) message[1].onFailure(err);
                  });
              
    case "reviews/load":
      return fetch(`/api/users/${message[1].userid}/reviews`, {
        headers: Auth.headers(user)
      })
        .then((res) => res.json())
        .then((reviews) => apply((model) => ({ ...model, myReviews: reviews })));

    default:
      throw new Error(`Unhandled message: ${message[0]}`);
  }
}*/

import { Msg } from "./messages";
import { Model } from "./model";
import { Auth, Update } from "@calpoly/mustang";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "film/select":
      return fetch(`/api/films/${message[1].id}`, {
        headers: Auth.headers(user)
      })
        .then((res) => res.json())
        .then((film) => apply((model) => ({ ...model, selectedFilm: film })));

    case "films/load":
      return fetch("/api/films", {
        headers: Auth.headers(user)
      })
        .then((res) => res.json())
        .then((films) => apply((model) => ({ ...model, films })));

    /*case "review/save": {
      const { filmId, review, onSuccess, onFailure } = message[1];

      return fetch(`/api/films/${filmId}/review`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...Auth.headers(user)
        },
        body: JSON.stringify(review)
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to save review");
          return res.json();
        })
        .then(() => {
          // Refresh selectedFilm so reviews update
          return fetch(`/api/films/${filmId}`, {
            headers: Auth.headers(user)
          });
        })
        .then((res) => res.json())
        .then((film) => {
          apply((model) => ({ ...model, selectedFilm: film }));
          if (onSuccess) onSuccess();
        })
        .catch((err) => {
          if (onFailure) onFailure(err);
        });
    }*/
       case "review/save": {
          const { filmId, review, onSuccess, onFailure } = message[1];
        
          return fetch(`/api/films/${filmId}/review`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...Auth.headers(user)
            },
            body: JSON.stringify(review)
          })
            .then((res) => {
              if (!res.ok) throw new Error("Failed to save review");
              return res.json(); // Only returns message and reviews
            })
            .then(() =>
              fetch(`/api/films/${filmId}`, {
                headers: Auth.headers(user)
              })
            )
            .then((res) => res.json())
            .then((film) => {
              apply((model) => ({ ...model, selectedFilm: film }));
              if (onSuccess) onSuccess();
            })
            .catch((err) => {
              if (onFailure) onFailure(err);
            });
        }
    case "profile/select":
      return fetch(`/api/profile/${message[1].userid}`, {
        headers: Auth.headers(user)
      })
        .then((res) => res.json())
        .then((profile) => apply((model) => ({ ...model, profile })));

    case "profile/save":
      return fetch(`/api/profile/${message[1].userid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...Auth.headers(user)
        },
        body: JSON.stringify(message[1].profile)
      })
        .then((res) => res.json())
        .then((profile) => {
          apply((model) => ({ ...model, profile }));
          if (message[1].onSuccess) message[1].onSuccess();
        })
        .catch((err) => {
          if (message[1].onFailure) message[1].onFailure(err);
        });

    case "reviews/load":
      return fetch(`/api/users/${message[1].userid}/reviews`, {
        headers: Auth.headers(user)
      })
        .then((res) => res.json())
        .then((reviews) => apply((model) => ({ ...model, myReviews: reviews })));

    default:
      throw new Error(`Unhandled message: ${message[0]}`);
  }
}

