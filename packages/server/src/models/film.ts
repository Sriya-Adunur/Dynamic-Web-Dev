/*import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  username: String,
  rating: Number,
  comment: String,
  date: String
});


const FilmSchema = new Schema({
  title: { type: String, required: true },
  plot: { type: String, required: true },
  genres: [String],
  cast: [{ name: String, role: String }],
  filmImage: { type: String, required: true },
  review: ReviewSchema
});

export interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string; // ISO string
}

  export interface Film {
        title: string;
        plot: string;
        genres: string[];
        cast: { name: string; role: string }[];
        filmImage: string;
        review?: Review;  
  }


const FilmModel = models.Film || model<Film>("Film", FilmSchema);
export default FilmModel;*/

import { Schema, model, models } from "mongoose";

export interface Review {
  username: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Film {
  title: string;
  plot: string;
  genres: string[];
  cast: { name: string; role: string }[];
  filmImage: string;
  reviews: Review[];
}

const ReviewSchema = new Schema({
  username: String,
  rating: Number,
  comment: String,
  date: String
});

const FilmSchema = new Schema<Film>({
  title: { type: String, required: true },
  plot: { type: String, required: true },
  genres: [String],
  cast: [{ name: String, role: String }],
  filmImage: { type: String, required: true },
  reviews: [ReviewSchema] 
});

const FilmModel = models.Film || model<Film>("Film", FilmSchema);
export default FilmModel;
