export interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string; // ISO string
}

/*export interface Film {
    filmImage: string;
    ratingLink: string;
  }*/

    export interface Film {
      title: string;
      plot: string;
      genres: string[];
      cast: { name: string; role: string }[];
      filmImage: string;
      reviews?: Review[];
    }